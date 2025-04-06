"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Types
export interface User {
  id: number
  username: string
  nome: string
  perfil: string
  token?: string
}

export interface LoginCredentials {
  username: string
  senha: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to check if we're in browser
const isBrowser = () => typeof window !== "undefined"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check if user is authenticated on page load
  useEffect(() => {
    if (isBrowser()) {
      const storedUser = sessionStorage.getItem("user")
      const token = sessionStorage.getItem("auth_token")

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Erro ao parsear usuário armazenado:", e)
          sessionStorage.removeItem("user")
          sessionStorage.removeItem("auth_token")
        }
      }

      setLoading(false)
    }
  }, [])

  // Function to check authentication status
  const checkAuth = async (): Promise<boolean> => {
    if (!isBrowser()) return false

    const token = sessionStorage.getItem("auth_token")
    return !!token
  }

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Falha na autenticação")
      }

      const data = await response.json()

      // Extract token and user data
      const { token, ...userData } = data

      // Create user object
      const loggedUser: User = {
        id: userData.id || userData.usuario?.id,
        username: userData.username || userData.usuario?.username,
        nome: userData.nome || userData.usuario?.nome,
        perfil: userData.perfil || userData.usuario?.perfil || "USER",
        token,
      }

      // Store in sessionStorage (will be cleared when browser is closed)
      if (isBrowser()) {
        sessionStorage.setItem("auth_token", token)
        sessionStorage.setItem("user", JSON.stringify(loggedUser))
      }

      setUser(loggedUser)

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${loggedUser.nome || loggedUser.username}!`,
      })
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
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("user")
    }

    setUser(null)

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })

    // Redirecionar para a página de login
    router.push("/login")
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
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

