import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para login se o token expirou
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authService = {
  login: async (credentials: { email: string; senha: string }) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },
}

export const produtoService = {
  listarProdutos: async () => {
    const response = await api.get("/produtos")
    return response.data
  },

  buscarProduto: async (id: number) => {
    const response = await api.get(`/produtos/${id}`)
    return response.data
  },

  criarProduto: async (produto: any) => {
    const response = await api.post("/produtos", produto)
    return response.data
  },

  atualizarProduto: async (id: number, produto: any) => {
    const response = await api.put(`/produtos/${id}`, produto)
    return response.data
  },

  removerProduto: async (id: number) => {
    await api.delete(`/produtos/${id}`)
  },
}

export const usuarioService = {
  listarUsuarios: async () => {
    const response = await api.get("/usuarios")
    return response.data
  },

  buscarUsuario: async (id: number) => {
    const response = await api.get(`/usuarios/${id}`)
    return response.data
  },

  criarUsuario: async (usuario: any) => {
    const response = await api.post("/usuarios", usuario)
    return response.data
  },

  atualizarUsuario: async (id: number, usuario: any) => {
    const response = await api.put(`/usuarios/${id}`, usuario)
    return response.data
  },

  removerUsuario: async (id: number) => {
    await api.delete(`/usuarios/${id}`)
  },
}

export default api

