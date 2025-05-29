import apiClient from "@/services/apiClient"
import { error } from "console"

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

      console.log("Criando produto:", produto)
      const response = await apiClient.post("/produtos", produto)
      console.log("Produto ciado com sucesso:", response.data)
      return response.data
    } catch (error: any) {
      console.error("Erro ao criar produto:", error)
      console.error("Detalhes do erro:", error.response?.data)
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

      console.log(`Atualizando produto ${id}:`, produto)

      // Garantir que o ID não seja enviado no corpo da requisição
      const { id: _, ...dadosProduto } = produto

      // Garantir que todos os campos necessários estejam presentes
      const dadosCompletos = {
        codigo: dadosProduto.codigo || "",
        nome: dadosProduto.nome || "",
        categoria: dadosProduto.categoria || "",
        quantidade: dadosProduto.quantidade || "",
        preco: dadosProduto.preco || 0,
        ...dadosProduto,
      }

      console.log(`Dados finais para atualização do produto ${id}`, dadosCompletos)

      const response = await apiClient.put(`/produtos/${id}`, dadosCompletos)
      console.log("Produto atualizado com sucesso:", response.data)
      return response.data
    } catch (error: any) {
      console.error(`Erro ao atualizar produto ${id}:`, error)
      console.error("Detalhes do erro", error.response?.data)
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
    } catch (error: any) {
      console.error(`Erro ao excluir produto ${id}:`, error)
      console.error("Detalhes do erro:", error.response?.data)
      throw error
    }
  },

  async adicionarEstoque(id: number, quantidade: number) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao adicionar estoque")
        throw new Error("Você precisa estar autenticado para acessar este recurso")
      }

      console.log(`Adicionando ${quantidade} unidades ao estoque do produto ${id}`)

      //Usando o endpoint especifico
      const response = await apiClient.post(`/produtos/${id}/adicionar-estoque?quantidade=${quantidade}`)

      console.log("Estoque adicionado com sucesso")
      return response.data
    } catch (error: any) {
      console.error(`Erro ao adicionar estoque ao produto ${id}`, error)
      console.error("Detalhes do erro:", error.response?.data)
      throw error
    }
  },

  async removerEstoque(id: number, quantidade: number) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao remover estoque")
        throw new Error("Você precisa estar autenticado para acessar este recurso")
      }

      console.log(`Removendo ${quantidade} unidades do estoque do produto ${id}`)

      // Usar o endpoint específico: POST /produtos/{id}/remover-estoque
      const response = await apiClient.post(`/produtos/${id}/remover-estoque?quantidade=${quantidade}`)

      console.log("Estoque removido com sucesso")
      return response.data
    } catch (error: any) {
      console.error(`Erro ao remover estoque do produto ${id}:`, error)
      console.error("Detalhes do erro:", error.response?.data)

      // Se for erro 400 (Bad Request), pode ser estoque insuficiente
      if (error.response?.status === 400) {
        throw new Error("Estoque insuficiente para realizar esta operação")
      }

      throw error
    }
  },

  // Métodos adicionais baseados no seu controller

  async buscarProdutoPorCodigo(codigo: string) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao buscar produto por código")
        return produtosExemplo.find((p) => p.codigo === codigo) || null
      }

      const response = await apiClient.get(`/produtos/codigo/${codigo}`)
      return response.data
    } catch (error: any) {
      console.error(`Erro ao buscar produto por código ${codigo}:`, error)

      // Se for 404, retornar null
      if (error.response?.status === 404) {
        return null
      }

      // Em caso de outros erros, retornar produto de exemplo se existir
      return produtosExemplo.find((p) => p.codigo === codigo) || null
    }
  },

  async buscarProdutosPorCategoria(categoria: string) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado ao buscar produtos por categoria")
        return produtosExemplo.filter((p) => p.categoria === categoria)
      }

      const response = await apiClient.get(`/produtos/categoria/${categoria}`)
      return response.data
    } catch (error: any) {
      console.error(`Erro ao buscar produtos por categoria ${categoria}:`, error)

      // Em caso de erro, retornar produtos de exemplo da categoria
      return produtosExemplo.filter((p) => p.categoria === categoria)
    }
  },

}

export default produtoService
