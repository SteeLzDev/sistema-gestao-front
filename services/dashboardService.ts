import api from "./api"

export interface DashboardData {
  vendasRecentes: {
    total: number
    itens: Array<{
      id: number
      cliente: string
      dataHora: string
      valorTotal: number
    }>
  }
  estoque: {
    total: number
    baixoEstoque: number
    itens: Array<{
      id: number
      nome: string
      quantidade: number
      preco: number
    }>
  }
  fila: {
    aguardando: number
    emAtendimento: number
    itens: Array<{
      id: number
      nome: string
      servico: string
      status: string
      chegada?: string
    }>
  }
  servicos: {
    pendentes: number
    concluidos: number
    itens: Array<{
      id: number
      cliente: string
      descricao: string
      status: string
      dataInicio?: string
      dataFim?: string
    }>
  }
}

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await api.get("dashboard")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error)

      // Se o endpoint não existir ainda, podemos buscar os dados separadamente
      return this.getDashboardDataAlternative()
    }
  },

  // Método alternativo que busca os dados de diferentes endpoints
  async getDashboardDataAlternative(): Promise<DashboardData> {
    try {
      // Buscar vendas recentes
      const vendasResponse = await api.get("vendas?limit=5")
      const vendas = vendasResponse.data || []

      // Buscar produtos com estoque baixo
      const produtosResponse = await api.get("produtos")
      const produtos = produtosResponse.data || []
      const produtosBaixoEstoque = produtos.filter((p: any) => p.quantidade <= 5)

      // Buscar clientes na fila
      const filaResponse = await api.get("fila/clientes")
      const clientesFila = filaResponse.data || []

      // Buscar atendimentos em andamento
      const atendimentosResponse = await api.get("fila/atendimentos")
      const atendimentos = atendimentosResponse.data || []

      return {
        vendasRecentes: {
          total: vendas.length,
          itens: vendas.slice(0, 5).map((v: any) => ({
            id: v.id,
            cliente: v.cliente,
            dataHora: v.dataHora,
            valorTotal: v.valorTotal,
          })),
        },
        estoque: {
          total: produtos.length,
          baixoEstoque: produtosBaixoEstoque.length,
          itens: produtosBaixoEstoque.slice(0, 5).map((p: any) => ({
            id: p.id,
            nome: p.nome,
            quantidade: p.quantidade,
            preco: p.preco,
          })),
        },
        fila: {
          aguardando: clientesFila.filter((c: any) => c.status === "AGUARDANDO").length,
          emAtendimento: atendimentos.length,
          itens: clientesFila.slice(0, 5).map((c: any) => ({
            id: c.id,
            nome: c.nome,
            servico: c.servico,
            status: c.status,
            chegada: c.chegada,
          })),
        },
        servicos: {
          pendentes: atendimentos.length,
          concluidos: 0, // Precisamos de um endpoint para isso
          itens: atendimentos.slice(0, 5).map((a: any) => ({
            id: a.id,
            cliente: a.nome,
            descricao: a.servico,
            status: a.status,
            dataInicio: a.inicio,
          })),
        },
      }
    } catch (error) {
      console.error("Erro ao buscar dados alternativos do dashboard:", error)
      throw error
    }
  },
}

export default dashboardService

