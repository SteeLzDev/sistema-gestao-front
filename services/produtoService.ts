import api from "./api"
import type { Produto } from "@/types/produto"

export const produtoService = {
  async listarProdutos(): Promise<Produto[]> {
    try {
      const response = await api.get("/produtos")
      return response.data
    } catch (error) {
      console.error("Erro ao listar produtos:", error)
      throw error
    }
  },

  async obterProduto(id: number): Promise<Produto> {
    try {
      const response = await api.get(`/produtos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao obter produto ${id}:`, error)
      throw error
    }
  },

  async cadastrarProduto(produto: Omit<Produto, "id">): Promise<Produto> {
    try {
      const response = await api.post("/produtos", produto)
      return response.data
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error)
      throw error
    }
  },

  // Adicionando o alias criarProduto para manter compatibilidade
  async criarProduto(produto: Omit<Produto, "id">): Promise<Produto> {
    return this.cadastrarProduto(produto)
  },

  async atualizarProduto(id: number, produto: Partial<Produto>): Promise<Produto> {
    try {
      const response = await api.put(`/produtos/${id}`, produto)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error)
      throw error
    }
  },

  async excluirProduto(id: number): Promise<void> {
    try {
      await api.delete(`/produtos/${id}`)
    } catch (error) {
      console.error(`Erro ao excluir produto ${id}:`, error)
      throw error
    }
  },
}

export default produtoService

