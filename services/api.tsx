import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

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

// Adicione serviços similares para outros recursos (usuários, vendas, etc.)

export default api

