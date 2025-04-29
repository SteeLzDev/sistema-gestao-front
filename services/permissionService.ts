import apiClient from "./apiClient"

// Serviço para gerenciar permissões de usuários
export const permissionService = {
  // Adicionar permissão VENDA_VISUALIZAR ao usuário atual
  addVendaVisualizarPermission: async (): Promise<boolean> => {
    try {
      // Obter usuário atual do localStorage
      const userStr = localStorage.getItem("user")
      if (!userStr) {
        console.error("Usuário não encontrado no localStorage")
        return false
      }

      const user = JSON.parse(userStr)

      // Verificar se o usuário já tem a permissão
      if (user.permissoes && user.permissoes.includes("VENDA_VISUALIZAR")) {
        console.log("Usuário já possui a permissão VENDA_VISUALIZAR")
        return true
      }

      // Adicionar a permissão VENDA_VISUALIZAR
      const updatedPermissions = [...user.permissoes, "VENDA_VISUALIZAR"]

      // Atualizar o usuário no localStorage
      user.permissoes = updatedPermissions
      localStorage.setItem("user", JSON.stringify(user))

      console.log("Permissão VENDA_VISUALIZAR adicionada com sucesso")
      return true
    } catch (error) {
      console.error("Erro ao adicionar permissão VENDA_VISUALIZAR:", error)
      return false
    }
  },

  // Obter permissões de um usuário
  getUserPermissions: async (userId: number): Promise<string[]> => {
    try {
      // Tentar obter permissões do usuário específico
      const response = await apiClient.get(`/usuarios/${userId}/permissoes`)
      return response.data
    } catch (error) {
      console.error("Erro ao obter permissões do usuário:", error)

      // Tentar obter permissões do usuário logado como fallback
      try {
        const userResponse = await apiClient.get("/auth/me")
        return userResponse.data.permissoes || []
      } catch (innerError) {
        console.error("Erro ao obter permissões do usuário logado:", innerError)

        // Se não conseguir obter do backend, tentar obter do localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser)
              return user.permissoes || []
            } catch (e) {
              console.error("Erro ao parsear usuário do localStorage:", e)
            }
          }
        }

        return []
      }
    }
  },

  // Atualizar permissões de um usuário
  updateUserPermissions: async (userId: number, permissions: string[]): Promise<void> => {
    await apiClient.put(`/usuarios/${userId}/permissoes`, { permissoes: permissions })
  },
}

export default permissionService
