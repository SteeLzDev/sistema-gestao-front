import api from "./api"
import type { Cliente, Atendimento } from "@/types/fila"

export const filaService = {
  async getClientesNaFila(): Promise<Cliente[]> {
    try {
      const response = await api.get("/fila/clientes")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar clientes na fila:", error)
      throw error
    }
  },

  // Temporariamente, retornamos um array vazio até que o endpoint seja implementado no backend
  async getClientesEmAtendimento(): Promise<Atendimento[]> {
    try {
      // Como o endpoint não existe no backend, retornamos um array vazio por enquanto
      console.warn("Endpoint para listar atendimentos não implementado no backend")
      return []
    } catch (error) {
      console.error("Erro ao buscar clientes em atendimento:", error)
      throw error
    }
  },

  async adicionarClienteNaFila(cliente: Omit<Cliente, "id" | "chegada" | "espera">): Promise<Cliente> {
    try {
      const response = await api.post("/fila/adicionar", cliente)
      return response.data
    } catch (error) {
      console.error("Erro ao adicionar cliente na fila:", error)
      throw error
    }
  },

  async iniciarAtendimento(id: number, atendente = "Atendente"): Promise<Atendimento> {
    try {
      // Ajustado para usar o endpoint correto e incluir o atendente como parâmetro
      const response = await api.post(`/fila/atender/${id}?atendente=${atendente}`)
      return response.data
    } catch (error) {
      console.error("Erro ao iniciar atendimento:", error)
      throw error
    }
  },

  async finalizarAtendimento(id: number): Promise<void> {
    try {
      // Ajustado para usar o endpoint correto
      await api.post(`/fila/finalizar/${id}/`)
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error)
      throw error
    }
  },

  async removerClienteDaFila(id: number): Promise<void> {
    try {
      // Adicionado método para remover cliente da fila
      await api.delete(`/fila/${id}`)
    } catch (error) {
      console.error("Erro ao remover cliente da fila:", error)
      throw error
    }
  },
}

export default filaService

