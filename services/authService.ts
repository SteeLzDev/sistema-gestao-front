import apiClient from "./apiClient"

// Interface para permissões que são objetos
interface PermissionObject {
  id?: number | string
  nome: string
  descricao?: string
}

// Tipo união para representar os possíveis formatos de permissão
type Permission = string | PermissionObject

const authService = {
  login: async (credentials: { username: string; senha: string }) => {
    try {
      // Remover qualquer token antigo antes de tentar fazer login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }

      console.log("Tentando login com username:", credentials.username)

      // Usar a URL completa para garantir que estamos acessando o endpoint correto
      const response = await apiClient.post("/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
          // Não incluir Authorization aqui para evitar conflitos
        },
      })

      console.log("Resposta do servidor:", response.status, response.statusText)

      // Armazenar token e dados do usuário
      if (typeof window !== "undefined") {
        // Verificar se o token foi retornado
        if (!response.data.token) {
          console.error("Token não retornado pelo servidor")
          throw new Error("Token não retornado pelo servidor")
        }

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        console.log("Login bem-sucedido. Token armazenado:", response.data.token.substring(0, 20) + "...")
      }

      return response
    } catch (error: any) {
      console.error("Erro detalhado ao fazer login:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      })

      // Mensagens de erro mais específicas
      if (error.response) {
        if (error.response.status === 403) {
          throw new Error("Acesso proibido. Verifique suas credenciais e permissões.")
        } else if (error.response.status === 401) {
          throw new Error("Credenciais inválidas. Verifique seu nome de usuário e senha.")
        } else if (error.response.data) {
          throw new Error(error.response.data)
        }
      }

      throw error
    }
  },

  isAuthenticated: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      return !!token
    }
    return false
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        return JSON.parse(userStr)
      }
    }
    return null
  },

  hasPermission: (permission: string): boolean => {
    const user = authService.getCurrentUser()
    if (!user) return false

    // Verificar se o usuário é administrador (tem todas as permissões)
    if (user.perfil === "Administrador" || user.perfil === "ADMIN" || user.perfil === "ADMINISTRADOR") return true

    // Normalizar a permissão solicitada (substituir espaços por underscores)
    const normalizedPermission = permission.replace(/ /g, "_").toUpperCase()

    // Verificar se o usuário tem a permissão específica
    if (user.permissoes && Array.isArray(user.permissoes)) {
      // Verificar permissões como strings
      if (
        user.permissoes.some(
          (perm: Permission) =>
            typeof perm === "string" && perm.replace(/ /g, "_").toUpperCase() === normalizedPermission,
        )
      ) {
        return true
      }

      // Verificar permissões como objetos
      if (
        user.permissoes.some(
          (perm: Permission) =>
            typeof perm === "object" &&
            perm !== null &&
            "nome" in perm &&
            typeof perm.nome === "string" &&
            perm.nome.replace(/ /g, "_").toUpperCase() === normalizedPermission,
        )
      ) {
        return true
      }
    }

    return false
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  },

  // Nova função para renovar o token
  refreshToken: async (): Promise<boolean> => {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem("token")
    if (!token) {
      console.warn("Não há token para renovar")
      return false
    }

    try {
      console.log("Tentando renovar token...")

      // Usar axios diretamente para evitar loops com o apiClient
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao/api"

      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.warn(`Falha ao renovar token: ${response.status} ${response.statusText}`)
        return false
      }

      const data = await response.json()

      if (data && data.token) {
        console.log("Token renovado com sucesso")

        // Atualizar token no localStorage
        localStorage.setItem("token", data.token)

        // Atualizar token no objeto do usuário
        const userStr = localStorage.getItem("user")
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            user.token = data.token
            localStorage.setItem("user", JSON.stringify(user))
          } catch (e) {
            console.error("Erro ao atualizar usuário no localStorage:", e)
          }
        }

        return true
      }

      console.warn("Resposta de renovação de token não contém token")
      return false
    } catch (error) {
      console.error("Erro ao renovar token:", error)
      return false
    }
  },

  // Função para obter o token atual
  getToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  },
}

export default authService
