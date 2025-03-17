import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Serviço de produtos
export const produtoService = {
  listarProdutos: async () => {
    try {
      const response = await api.get("/produtos")
      return response.data
    } catch (error) {
      console.error("Erro ao listar produtos:", error)
      throw error
    }
  },

  buscarProduto: async (id: number) => {
    try {
      const response = await api.get(`/produtos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error)
      throw error
    }
  },

  criarProduto: async (produto: any) => {
    try {
      const response = await api.post("/produtos", produto)
      return response.data
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      throw error
    }
  },

  atualizarProduto: async (id: number, produto: any) => {
    try {
      const response = await api.put(`/produtos/${id}`, produto)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error)
      throw error
    }
  },

  removerProduto: async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`)
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
      const response = await api.get("/usuarios")
      return response.data
    } catch (error) {
      console.error("Erro ao listar usuários:", error)
      throw error
    }
  },

  buscarUsuario: async (id: number) => {
    try {
      const response = await api.get(`/usuarios/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error)
      throw error
    }
  },

  criarUsuario: async (usuario: any) => {
    try {
      const response = await api.post("/usuarios", usuario)
      return response.data
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      throw error
    }
  },

  atualizarUsuario: async (id: number, usuario: any) => {
    // Se a senha estiver vazia, remova-a do objeto para não sobrescrever a senha existente
    if (usuario.senha === "") {
      const { senha, ...usuarioSemSenha } = usuario
      const response = await api.put(`/usuarios/${id}`, usuarioSemSenha)
      return response.data
    } else {
      const response = await api.put(`/usuarios/${id}`, usuario)
      return response.data
    }
  },

  removerUsuario: async (id: number) => {
    try {
      await api.delete(`/usuarios/${id}`)
    } catch (error) {
      console.error(`Erro ao remover usuário ${id}:`, error)
      throw error
    }
  },
}

// Serviço de autenticação (simplificado por enquanto)
export const authService = {
  getCurrentUser: () => {
    return {
      id: 1,
      nome: "Carlos Oliveira",
      username: "carlos",
      email: "carlos@oficina.com",
      senha: "123456",
      cargo: "Gerente",
      perfil: "Administrador",
      status: "Ativo",
    }
  },

  isAuthenticated: () => true,

  logout: () => {
    window.location.href = "/login"
  },
}

export default api

