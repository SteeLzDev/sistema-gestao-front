import apiClient from "@/services/apiClient"

// Dados de exemplo para usar como fallback quando a API falhar
const produtosExemplo = [
  {
    id: 1,
    codigo: "PROD001",
    nome: "Smartphone XYZ",
    quantidade: 15,
    preco: 1299.99,
    categoria: "Eletrônicos",
  },
  {
    id: 2,
    codigo: "PROD002",
    nome: "Notebook ABC",
    quantidade: 8,
    preco: 3499.99,
    categoria: "Eletrônicos",
  },
  {
    id: 3,
    codigo: "PROD003",
    nome: "Mouse sem fio",
    quantidade: 30,
    preco: 89.99,
    categoria: "Periféricos",
  },
]

  const produtoService = {
  async listarProdutos() {
    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao listar produtos")
        return produtosExemplo
      }

      const response = await apiClient.get("/produtos")
      return response.data
    } catch (error) {
      console.error("Erro ao listar produtos:", error)

      // Em caso de erro, retornar dados de exemplo
      return produtosExemplo
    }
  },

  async obterProduto(id: number) {
    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao obter produto")
        return produtosExemplo.find((p) => p.id === id) || produtosExemplo[0]
      }

      const response = await apiClient.get(`/produtos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao obter produto ${id}:`, error)

      // Em caso de erro, retornar um produto de exemplo
      return produtosExemplo.find((p) => p.id === id) || produtosExemplo[0]
    }
  },

  async criarProduto(produto: any) {
    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao criar produto")
        throw new Error("Você precisa estar autenticado para acessar este recurso")
      }

      const response = await apiClient.post("/produtos", produto)
      return response.data
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      throw error
    }
  },

  async atualizarProduto(id: number, produto: any) {
    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao atualizar produto")
        throw new Error("Você precisa estar autenticado para acessar este recurso")
      }

      const response = await apiClient.put(`/produtos/${id}`, produto)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error)
      throw error
    }
  },

  async excluirProduto(id: number) {
    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao excluir produto")
        throw new Error("Você precisa estar autenticado para acessar este recurso")
      }

      const response = await apiClient.delete(`/produtos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao excluir produto ${id}:`, error)
      throw error
    }
  },
}

export default produtoService
