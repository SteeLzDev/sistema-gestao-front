import api from "./api"
import type { VendaForm, VendaDTO, ItemVendaDTO } from "@/types/venda"

export const vendaService = {
  async registrarVenda(venda: VendaForm) {
    try {
      // Validar se há itens
      if (!venda.itens || venda.itens.length === 0) {
        throw new Error("A venda deve ter pelo menos um item")
      }

      // Mapear os itens para o formato esperado pelo backend
      const itensDTO: ItemVendaDTO[] = venda.itens.map((item) => ({
        produtoId: item.produto.id,
        produtoNome: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
        subtotal: item.subtotal,
      }))

      // Criar o DTO para enviar ao backend
      const vendaDTO: VendaDTO = {
        cliente: venda.cliente,
        itens: itensDTO,
      }

      console.log("Enviando venda para o backend:", JSON.stringify(vendaDTO, null, 2))

      const response = await api.post("vendas", vendaDTO)
      return response.data
    } catch (error: any) {
      console.error("Erro ao registrar venda:", error)
      throw error
    }
  },

  async listarVendas() {
    try {
      const response = await api.get("vendas")
      return response.data
    } catch (error) {
      console.error("Erro ao listar vendas:", error)
      throw error
    }
  },

  async obterVenda(id: number) {
    try {
      // Usar template string para garantir que o ID seja convertido para string
      const url = `vendas/${id}`
      console.log(`Fazendo requisição para: ${url}`) // Log para depuração

      const response = await api.get(url)
      console.log("Resposta do servidor:", response.data) // Log para depuração
      return response.data
    } catch (error: any) {
      console.error(`Erro ao obter venda ${id}:`, error)
      if (error.response) {
        console.error("Status:", error.response.status)
        console.error("Dados:", error.response.data)
      }
      throw error
    }
  },
}

export default vendaService

