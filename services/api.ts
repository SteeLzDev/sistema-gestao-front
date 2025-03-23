import apiClient from "./apiClient"

// Adicionar a importação do serviço de fila
import filaService from "./filaService"

// Serviço de autenticação
export const authService = {
  login: async (credentials: { email: string; senha: string }) => {
    try {
      const response = await apiClient.post("/auth/login", credentials)
      return response
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  },
}

// Serviço de produtos
export const produtoService = {
  listarProdutos: async () => {
    try {
      const response = await apiClient.get("/produtos")
      return response.data
    } catch (error) {
      console.error("Erro ao listar produtos:", error)
      throw error
    }
  },

  buscarProduto: async (id: number) => {
    try {
      const response = await apiClient.get(`/produtos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error)
      throw error
    }
  },

  criarProduto: async (produto: any) => {
    try {
      const response = await apiClient.post("/produtos", produto)
      return response.data
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      throw error
    }
  },

  atualizarProduto: async (id: number, produto: any) => {
    try {
      const response = await apiClient.put(`/produtos/${id}`, produto)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error)
      throw error
    }
  },

  removerProduto: async (id: number) => {
    try {
      await apiClient.delete(`/produtos/${id}`)
    } catch (error) {
      console.error(`Erro ao remover produto ${id}:`, error)
      throw error
    }
  },
}

// Serviço de usuários
export const usuarioService = {
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

// Serviço de vendas
export const vendaService = {
  listarVendas: async () => {
    try {
      const response = await apiClient.get("/vendas")
      return response.data
    } catch (error) {
      console.error("Erro ao listar vendas:", error)
      throw error
    }
  },

  buscarVenda: async (id: number) => {
    try {
      const response = await apiClient.get(`/vendas/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar venda ${id}:`, error)
      throw error
    }
  },

  buscarVendasPorCliente: async (cliente: string) => {
    try {
      const response = await apiClient.get(`/vendas/cliente/${cliente}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar vendas do cliente ${cliente}:`, error)
      throw error
    }
  },

  buscarVendasPorPeriodo: async (inicio: string, fim: string) => {
    try {
      const response = await apiClient.get(`/vendas/periodo?inicio=${inicio}&fim=${fim}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar vendas por período:`, error)
      throw error
    }
  },

  registrarVenda: async (venda: any) => {
    try {
      const response = await apiClient.post("/vendas", venda)
      return response.data
    } catch (error) {
      console.error("Erro ao registrar venda:", error)
      throw error
    }
  },

  cancelarVenda: async (id: number) => {
    try {
      await apiClient.delete(`/vendas/${id}`)
    } catch (error) {
      console.error(`Erro ao cancelar venda ${id}:`, error)
      throw error
    }
  },
}

export default apiClient

// Adicionar a exportação do serviço de fila
export { filaService }

