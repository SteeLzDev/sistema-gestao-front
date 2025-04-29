import apiClient from "@/services/apiClient"
import type { VendaDTO, ItemVendaDTO } from "@/types/venda"

// Dados de exemplo para usar como fallback quando a API falhar
const vendasExemplo = [
  {
    id: 1,
    cliente: "Cliente Exemplo 1",
    dataHora: new Date().toISOString(),
    valorTotal: 1250.0,
    itens: [
      {
        produtoId: 1,
        produtoNome: "Produto Exemplo 1",
        quantidade: 2,
        precoUnitario: 500.0,
        subtotal: 1000.0,
      },
      {
        produtoId: 2,
        produtoNome: "Produto Exemplo 2",
        quantidade: 1,
        precoUnitario: 250.0,
        subtotal: 250.0,
      },
    ],
  },
  {
    id: 2,
    cliente: "Cliente Exemplo 2",
    dataHora: new Date(Date.now() - 86400000).toISOString(), // Ontem
    valorTotal: 750.0,
    itens: [
      {
        produtoId: 3,
        produtoNome: "Produto Exemplo 3",
        quantidade: 3,
        precoUnitario: 250.0,
        subtotal: 750.0,
      },
    ],
  },
]

export const vendaService = {
  async registrarVenda(venda: { cliente: string; itens: any[] }) {
    try {
      // Validar se há itens
      if (!venda.itens || venda.itens.length === 0) {
        throw new Error("A venda deve ter pelo menos um item")
      }

      // Mapear os itens para o formato esperado pelo backend
      const itensDTO: ItemVendaDTO[] = venda.itens.map((item) => {
        // Verificar se o item já está no formato ItemVendaDTO
        if (item.produtoId !== undefined) {
          return {
            produtoId: item.produtoId,
            produtoNome: item.produtoNome,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            subtotal: item.subtotal,
          }
        }

        // Se estiver no formato ItemVendaForm
        if (item.produto !== undefined) {
          return {
            produtoId: item.produto.id,
            produtoNome: item.produto.nome,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            subtotal: item.subtotal,
          }
        }

        // Formato desconhecido, tentar extrair os dados necessários
        return {
          produtoId: item.produtoId || item.produto?.id,
          produtoNome: item.produtoNome || item.produto?.nome,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario,
          subtotal: item.subtotal,
        }
      })

      // Criar o DTO para enviar ao backend
      const vendaDTO: VendaDTO = {
        cliente: venda.cliente,
        itens: itensDTO,
      }

      console.log("Enviando venda para o backend:", JSON.stringify(vendaDTO, null, 2))

      // Adicionar logs para depuração do token
      const token = localStorage.getItem("token")
      console.log("Token usado na requisição:", token ? token.substring(0, 10) + "..." : "Não encontrado")

      const response = await apiClient.post("/vendas", vendaDTO)
      return response.data
    } catch (error: any) {
      console.error("Erro ao registrar venda:", error)
      throw error
    }
  },

  async listarVendas() {
    try {
      // Verificar token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.warn("Token não encontrado, usando dados de exemplo")
        return vendasExemplo
      }

      // Adicionar logs para depuração do token
      console.log(
        "Token usado na requisição de listar vendas:",
        token ? token.substring(0, 10) + "..." : "Não encontrado",
      )

      let response // Declare response here
      try {
        // Tentar com o endpoint correto (sem o "S")
        console.log("Tentando endpoint /vendas")
        response = await apiClient.get("/vendas")
        return response.data
      } catch (error: any) {
        console.log("Erro ao acessar /vendas:", error.message)

        // Se for erro 403 (Forbidden), usar dados de exemplo
        if (error.response && error.response.status === 403) {
          console.log("Permissão negada (403), usando dados de exemplo")
          return vendasExemplo
        }

        // Se for outro erro, tentar com o endpoint com "S"
        console.log("Tentando endpoint alternativo /venda")
        try {
          response = await apiClient.get("/venda")
          return response.data
        } catch (secondError: any) {
          console.log("Erro ao acessar /venda:", secondError.message)

          // Se for erro 403 (Forbidden), usar dados de exemplo
          if (secondError.response && secondError.response.status === 403) {
            console.log("Permissão negada (403), usando dados de exemplo")
            return vendasExemplo
          }

          // Se for outro erro, propagar o erro
          throw secondError
        }
      }
    } catch (error) {
      console.error("Erro ao listar vendas:", error)

      // Em caso de erro, retornar dados de exemplo
      console.log("Retornando dados de exemplo devido a erro")
      return vendasExemplo
    }
  },

  async obterVenda(id: number) {
    try {
      // Verificar token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        console.warn("Token não encontrado, usando dados de exemplo")
        return vendasExemplo.find((v) => v.id === id) || vendasExemplo[0]
      }

      let url = `/vendas/${id}` // Declare url here
      try {
        // Tentar com o endpoint correto (com o "S")
        console.log(`Fazendo requisição para: ${url}`)
        const response = await apiClient.get(url)
        return response.data
      } catch (error: any) {
        console.log(`Erro ao acessar ${url}:`, error.message)

        // Se for erro 403 (Forbidden), usar dados de exemplo
        if (error.response && error.response.status === 403) {
          console.log("Permissão negada (403), usando dados de exemplo")
          return vendasExemplo.find((v) => v.id === id) || vendasExemplo[0]
        }

        // Se for outro erro, tentar com o endpoint sem "S"
        console.log("Tentando endpoint alternativo...")
        url = `/venda/${id}`
        console.log(`Fazendo requisição para: ${url}`)

        try {
          const response = await apiClient.get(url)
          return response.data
        } catch (secondError: any) {
          console.log(`Erro ao acessar ${url}:`, secondError.message)

          // Se for erro 403 (Forbidden), usar dados de exemplo
          if (secondError.response && secondError.response.status === 403) {
            console.log("Permissão negada (403), usando dados de exemplo")
            return vendasExemplo.find((v) => v.id === id) || vendasExemplo[0]
          }

          // Se for outro erro, propagar o erro
          throw secondError
        }
      }
    } catch (error: any) {
      console.error(`Erro ao obter venda ${id}:`, error)

      // Em caso de erro, retornar dados de exemplo
      console.log("Retornando dados de exemplo devido a erro")
      return vendasExemplo.find((v) => v.id === id) || vendasExemplo[0]
    }
  },

  buscarVendasPorCliente: async (cliente: string) => {
    try {
      const response = await apiClient.get(`/vendas/cliente/${cliente}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar vendas do cliente ${cliente}:`, error)

      // Em caso de erro, filtrar dados de exemplo
      return vendasExemplo.filter((v) => v.cliente.toLowerCase().includes(cliente.toLowerCase()))
    }
  },

  buscarVendasPorPeriodo: async (inicio: string, fim: string) => {
    try {
      const response = await apiClient.get(`/vendas/periodo?inicio=${inicio}&fim=${fim}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar vendas por período:`, error)

      // Em caso de erro, retornar todos os dados de exemplo
      return vendasExemplo
    }
  },

  cancelarVenda: async (id: number) => {
    try {
      await apiClient.delete(`/vendas/${id}`)
      return true
    } catch (error) {
      console.error(`Erro ao cancelar venda ${id}:`, error)
      throw error
    }
  },
}

export default vendaService
