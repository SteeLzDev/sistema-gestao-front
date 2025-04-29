"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import apiClient from "@/services/apiClient"

// Types
export interface User {
  id: number
  username: string
  nome: string
  perfil: string
  permissoes: string[] // Campo de permissões (não opcional)
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
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to check if we're in browser
const isBrowser = () => typeof window !== "undefined"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Função para carregar o usuário do localStorage
  const loadUserFromStorage = useCallback(() => {
    if (!isBrowser()) return false

    try {
      const storedUser = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      if (!token || !storedUser) {
        console.warn("Token ou usuário não encontrado no localStorage")
        return false
      }

      // Recuperar usuário armazenado
      const parsedUser = JSON.parse(storedUser)

      // Garantir que o usuário tenha um array de permissões
      if (!parsedUser.permissoes) {
        parsedUser.permissoes = []
      }

      // Verificar se o usuário tem perfil ADMIN
      if (parsedUser.perfil === "ADMIN") {
        // Adicionar todas as permissões possíveis para ADMIN
        const todasPermissoes = [
          "ESTOQUE_VISUALIZAR",
          "ESTOQUE_ADICIONAR",
          "ESTOQUE_EDITAR",
          "ESTOQUE_REMOVER",
          "VENDAS_VISUALIZAR",
          "VENDAS_CRIAR",
          "VENDAS_CANCELAR",
          "FILA_VISUALIZAR",
          "FILA_GERENCIAR",
          "RELATORIOS_VISUALIZAR",
          "RELATORIOS_EXPORTAR",
          "USUARIOS_VISUALIZAR",
          "USUARIOS_CRIAR",
          "USUARIOS_EDITAR",
          "USUARIOS_REMOVER",
          "USUARIOS_PERMISSOES",
          "CONFIGURACOES_VISUALIZAR",
          "CONFIGURACOES_EDITAR",
        ]

        // Adicionar permissões que não existem ainda
        todasPermissoes.forEach((perm) => {
          if (!parsedUser.permissoes.includes(perm)) {
            parsedUser.permissoes.push(perm)
          }
        })
      }

      setUser(parsedUser)
      return true
    } catch (e) {
      console.error("Erro ao parsear usuário armazenado:", e)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      return false
    }
  }, [])

  // Check if user is authenticated on page load
  useEffect(() => {
    if (isBrowser()) {
      const success = loadUserFromStorage()
      setLoading(false)
    }
  }, [loadUserFromStorage])

  // Function to check authentication status
  const checkAuth = async (): Promise<boolean> => {
    if (!isBrowser()) return false

    const token = localStorage.getItem("token")
    return !!token
  }

  // Função para atualizar a autenticação
  const refreshAuth = async (): Promise<void> => {
    if (!isBrowser()) return

    try {
      setLoading(true)

      // Verificar se há token
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Token não encontrado")
      }

      // Fazer uma requisição para verificar a autenticação
      const response = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data) {
        // Garantir que permissões seja um array
        const permissoes = Array.isArray(response.data.permissoes) ? response.data.permissoes : []

        // Se o usuário for ADMIN, adicionar todas as permissões
        if (response.data.perfil === "ADMIN") {
          const todasPermissoes = [
            "ESTOQUE_VISUALIZAR",
            "ESTOQUE_ADICIONAR",
            "ESTOQUE_EDITAR",
            "ESTOQUE_REMOVER",
            "VENDAS_VISUALIZAR",
            "VENDAS_CRIAR",
            "VENDAS_CANCELAR",
            "FILA_VISUALIZAR",
            "FILA_GERENCIAR",
            "RELATORIOS_VISUALIZAR",
            "RELATORIOS_EXPORTAR",
            "USUARIOS_VISUALIZAR",
            "USUARIOS_CRIAR",
            "USUARIOS_EDITAR",
            "USUARIOS_REMOVER",
            "USUARIOS_PERMISSOES",
            "CONFIGURACOES_VISUALIZAR",
            "CONFIGURACOES_EDITAR",
          ]

          // Adicionar permissões que não existem ainda
          todasPermissoes.forEach((perm) => {
            if (!permissoes.includes(perm)) {
              permissoes.push(perm)
            }
          })
        }

        // Atualizar o usuário com os dados mais recentes
        const updatedUser = {
          ...response.data,
          permissoes: permissoes,
          token,
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)

        console.log("Autenticação atualizada com sucesso")
      }
    } catch (error) {
      console.error("Erro ao atualizar autenticação:", error)

      // Tentar carregar do localStorage
      const success = loadUserFromStorage()

      if (!success) {
        // Se não conseguir carregar do localStorage, fazer logout
        // Mas não redirecionar automaticamente
        if (isBrowser()) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)

      console.log("Iniciando login com:", credentials.username)

      // URL sem /api/ para evitar duplicação
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"
      // Caminho corrigido para login (sem /api/ duplicado)
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

        // Garantir que permissões seja um array
        const permissoes = Array.isArray(user.permissoes) ? user.permissoes : []

        // Se o usuário for ADMIN, adicionar todas as permissões
        if (user.perfil === "ADMIN") {
          const todasPermissoes = [
            "ESTOQUE_VISUALIZAR",
            "ESTOQUE_ADICIONAR",
            "ESTOQUE_EDITAR",
            "ESTOQUE_REMOVER",
            "VENDAS_VISUALIZAR",
            "VENDAS_CRIAR",
            "VENDAS_CANCELAR",
            "FILA_VISUALIZAR",
            "FILA_GERENCIAR",
            "RELATORIOS_VISUALIZAR",
            "RELATORIOS_EXPORTAR",
            "USUARIOS_VISUALIZAR",
            "USUARIOS_CRIAR",
            "USUARIOS_EDITAR",
            "USUARIOS_REMOVER",
            "USUARIOS_PERMISSOES",
            "CONFIGURACOES_VISUALIZAR",
            "CONFIGURACOES_EDITAR",
          ]

          // Adicionar permissões que não existem ainda
          todasPermissoes.forEach((perm) => {
            if (!permissoes.includes(perm)) {
              permissoes.push(perm)
            }
          })
        }

        // Create user object
        const loggedUser: User = {
          id: user.id,
          username: user.username,
          nome: user.nome || user.username,
          perfil: user.perfil || "USER",
          permissoes: permissoes,
          token,
        }

        // Store in localStorage
        if (isBrowser()) {
          localStorage.setItem("token", token)
          console.log("Token armazenado em localStorage:", token.substring(0, 10) + "...")

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

          throw new Error(axiosError.response.data?.message || axiosError.response.data || "Falha na autenticação")
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

  // Modificar a função hasPermission para ser mais flexível e evitar redirecionamentos automáticos

  // Função para verificar se o usuário tem uma permissão específica
  const hasPermission = useCallback(
    (permission: string) => {
      if (!user || !user.permissoes) {
        console.warn("Verificação de permissão falhou: usuário ou permissões não definidos")
        return false
      }

      // Verificar se o usuário é ADMIN (tem todas as permissões)
      if (user.perfil === "ADMIN") {
        return true
      }

      // Verificar se a permissão existe diretamente
      if (user.permissoes.includes(permission)) {
        return true
      }

      // Mapeamentos comuns (frontend para backend e vice-versa)
      const mappings: Record<string, string> = {
        // Frontend para Backend
        view_inventory: "ESTOQUE_VISUALIZAR",
        add_inventory: "ESTOQUE_ADICIONAR",
        edit_inventory: "ESTOQUE_EDITAR",
        delete_inventory: "ESTOQUE_REMOVER",
        view_sales: "VENDAS_VISUALIZAR",
        create_sale: "VENDAS_CRIAR",
        cancel_sale: "VENDAS_CANCELAR",
        view_queue: "FILA_VISUALIZAR",
        manage_queue: "FILA_GERENCIAR",
        view_reports: "RELATORIOS_VISUALIZAR",
        export_reports: "RELATORIOS_EXPORTAR",
        view_users: "USUARIOS_VISUALIZAR",
        create_user: "USUARIOS_CRIAR",
        edit_user: "USUARIOS_EDITAR",
        delete_user: "USUARIOS_REMOVER",
        manage_permissions: "USUARIOS_PERMISSOES",
        view_settings: "CONFIGURACOES_VISUALIZAR",
        edit_settings: "CONFIGURACOES_EDITAR",

        // Backend para Frontend
        ESTOQUE_VISUALIZAR: "view_inventory",
        ESTOQUE_ADICIONAR: "add_inventory",
        ESTOQUE_EDITAR: "edit_inventory",
        ESTOQUE_REMOVER: "delete_inventory",
        VENDAS_VISUALIZAR: "view_sales",
        VENDA_VISUALIZAR: "view_sales",
        VENDAS_CRIAR: "create_sale",
        VENDA_CRIAR: "create_sale",
        VENDAS_CANCELAR: "cancel_sale",
        VENDA_CANCELAR: "cancel_sale",
        FILA_VISUALIZAR: "view_queue",
        FILA_GERENCIAR: "manage_queue",
        RELATORIOS_VISUALIZAR: "view_reports",
        RELATORIOS_EXPORTAR: "export_reports",
        USUARIOS_VISUALIZAR: "view_users",
        USUARIOS_CRIAR: "create_user",
        USUARIOS_EDITAR: "edit_user",
        USUARIOS_REMOVER: "delete_user",
        USUARIOS_PERMISSOES: "manage_permissions",
        CONFIGURACOES_VISUALIZAR: "view_settings",
        CONFIGURACOES_EDITAR: "edit_settings",
      }

      // Verificar se existe um mapeamento para a permissão
      const mappedPermission = mappings[permission]
      if (mappedPermission && user.permissoes.includes(mappedPermission)) {
        return true
      }

      // Verificar se a permissão sem o "S" existe (para compatibilidade com o backend)
      if (permission === "VENDAS_VISUALIZAR" && user.permissoes.includes("VENDA_VISUALIZAR")) {
        return true
      }
      if (permission === "VENDAS_CRIAR" && user.permissoes.includes("VENDA_CRIAR")) {
        return true
      }
      if (permission === "VENDAS_CANCELAR" && user.permissoes.includes("VENDA_CANCELAR")) {
        return true
      }

      // Verificar se a permissão com o "S" existe (para compatibilidade com o backend)
      if (permission === "VENDA_VISUALIZAR" && user.permissoes.includes("VENDAS_VISUALIZAR")) {
        return true
      }
      if (permission === "VENDA_CRIAR" && user.permissoes.includes("VENDAS_CRIAR")) {
        return true
      }
      if (permission === "VENDA_CANCELAR" && user.permissoes.includes("VENDAS_CANCELAR")) {
        return true
      }

      // Verificações adicionais para a permissão de fila
      if (permission === "VIEW_QUEUE" && user.permissoes.includes("FILA_GERENCIAR")) {
        return true
      }

      if (permission === "FILA_VISUALIZAR" && user.permissoes.includes("FILA_GERENCIAR")) {
        return true
      }

      return false
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
    refreshAuth,
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
