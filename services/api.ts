import axios from "axios"


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const produtoService = {
  listarProdutos: async () => {
    try {
      const response = await api.get("/produtos");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      // Você pode propagar o erro para o componente tratar ou retornar um valor default
      throw error;
    }
  },

  buscarProduto: async (id: number) => {
    try {
      const response = await api.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  criarProduto: async (produto: any) => {
    try {
      const response = await api.post("/produtos", produto);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  },

  atualizarProduto: async (id: number, produto: any) => {
    try {
      const response = await api.put(`/produtos/${id}`, produto);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  removerProduto: async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`);
    } catch (error) {
      console.error(`Erro ao remover produto ${id}:`, error);
      throw error;
    }
  },
};


export default api

