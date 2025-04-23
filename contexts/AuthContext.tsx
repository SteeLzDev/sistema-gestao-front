"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

// Types
export interface User {
  id: number
  username: string
  nome: string
  perfil: string
  permissoes?: string[] // Campo de permissões
  token?: string
}

export interface LoginCredentials {
  username: string
  password?: string // Opcional para compatibilidade
  senha?: string // Adicionado para compatibilidade com o backend
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to check if we're in browser
const isBrowser = () => typeof window !== "undefined"

// Função para extrair permissões do token JWT
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    console.error("Erro ao decodificar token JWT:", e)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check if user is authenticated on page load
  useEffect(() => {
    if (isBrowser()) {
      const storedUser = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      if (token && storedUser) {
        try {
          // Extrair permissões do token
          const tokenData = parseJwt(token)
          const permissions = tokenData?.permissoes || []

          // Recuperar usuário armazenado
          const parsedUser = JSON.parse(storedUser)

          // Adicionar permissões ao usuário
          setUser({
            ...parsedUser,
            permissoes: permissions,
          })
        } catch (e) {
          console.error("Erro ao parsear usuário armazenado:", e)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
        }
      }

      setLoading(false)
    }
  }, [])

  // Function to check authentication status
  const checkAuth = async (): Promise<boolean> => {
    if (!isBrowser()) return false

    const token = localStorage.getItem("token")
    return !!token
  }

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)

      console.log("Iniciando login com:", credentials.username)

      // URL sem /api/ para evitar duplicação
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"
      const loginUrl = `${baseUrl}/auth/login`
      console.log("URL de login:", loginUrl)

      // Dados a serem enviados - garantir que o campo seja 'senha'
      const loginData = {
        username: credentials.username,
        senha: credentials.senha || credentials.password, // Usar 'senha' com fallback para 'password'
      }

      console.log("Dados de login:", JSON.stringify(loginData, null, 2))

      // Usar Axios com depuração detalhada
      try {
        const response = await axios({
          method: "post",
          url: loginUrl,
          data: loginData,
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("Resposta do login:", response.data)

        // Extract token and user data
        const { token, user } = response.data

        console.log("Token recebido:", token ? "Sim (comprimento: " + token.length + ")" : "Não")
        console.log("Usuário recebido:", user)
        console.log("Permissões recebidas:", user.permissoes)

        // Create user object
        const loggedUser: User = {
          id: user.id,
          username: user.username,
          nome: user.nome,
          perfil: user.perfil || "USER",
          permissoes: user.permissoes || [],
          token,
        }

        // Store in localStorage
        if (isBrowser()) {
          localStorage.setItem("token", token)
          console.log("Token armazenado em localStorage")

          localStorage.setItem("user", JSON.stringify(loggedUser))
          console.log("Usuário armazenado em localStorage")
        }

        setUser(loggedUser)

        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo, ${loggedUser.nome || loggedUser.username}!`,
        })

        // Redirecionar para a página inicial após o login bem-sucedido
        router.push("/dashboard")
      } catch (axiosError: any) {
        console.error("Erro do Axios:", axiosError)

        if (axiosError.response) {
          console.error("Resposta de erro:", axiosError.response.data)
          console.error("Status:", axiosError.response.status)
          console.error("Cabeçalhos:", axiosError.response.headers)

          throw new Error(axiosError.response.data || "Falha na autenticação")
        } else if (axiosError.request) {
          console.error("Requisição sem resposta:", axiosError.request)
          throw new Error("Não foi possível conectar ao servidor")
        } else {
          console.error("Erro na configuração da requisição:", axiosError.message)
          throw new Error("Erro na configuração da requisição")
        }
      }
    } catch (error: any) {
      console.error("Erro no login:", error)

      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      })

      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    if (isBrowser()) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }

    setUser(null)

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })

    // Redirecionar para a página de login
    router.push("/login")
  }

  // Função para verificar se o usuário tem uma permissão específica
  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false

      return user.permissoes?.includes(permission) || false
    },
    [user],
  )

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
