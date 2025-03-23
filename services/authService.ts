import apiClient from "./apiClient"

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

  hasPermission: (permission: string) => {
    const user = authService.getCurrentUser()
    if (!user) return false

    // Verificar se o usuário é administrador (tem todas as permissões)
    if (user.perfil === "Administrador") return true

    // Implementar lógica específica de permissões aqui
    return false
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  },
}

export default authService

