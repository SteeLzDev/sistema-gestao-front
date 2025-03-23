import apiClient from "./apiClient"

const usuarioService = {
  listarUsuarios: async () => {
    try {
      const response = await apiClient.get("/usuarios")
      return response.data
    } catch (error) {
      console.error("Erro ao listar usuários:", error)
      throw error
    }
  },

  buscarUsuario: async (id: number) => {
    try {
      const response = await apiClient.get(`/usuarios/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error)
      throw error
    }
  },

  criarUsuario: async (usuario: any) => {
    try {
      const response = await apiClient.post("/usuarios", usuario)
      return response.data
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      throw error
    }
  },

  atualizarUsuario: async (id: number, usuario: any) => {
    try {
      const response = await apiClient.put(`/usuarios/${id}`, usuario)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error)
      throw error
    }
  },

  removerUsuario: async (id: number) => {
    try {
      await apiClient.delete(`/usuarios/${id}`)
    } catch (error) {
      console.error(`Erro ao remover usuário ${id}:`, error)
      throw error
    }
  },
}

export default usuarioService

