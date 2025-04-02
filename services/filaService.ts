import api from "./api"
import type { Cliente, Atendimento } from "@/types/fila"

export const filaService = {
  async getClientesNaFila(): Promise<Cliente[]> {
    try {
      const response = await api.get("/fila/clientes")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar clientes na fila:", error)
      return []
    }
  },

  async getClientesEmAtendimento(): Promise<Atendimento[]> {
    try {
      const response = await api.get("/fila/atendimentos")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar clientes em atendimento:", error)
      return []
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
      const response = await api.post(`/fila/atender/${id}?atendente=${atendente}`)
      return response.data
    } catch (error) {
      console.error("Erro ao iniciar atendimento:", error)
      throw error
    }
  },

  async finalizarAtendimento(id: number): Promise<void> {
    try {
      await api.post(`/fila/finalizar/${id}/`)
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error)
      throw error
    }
  },

  async removerClienteDaFila(id: number): Promise<void> {
    try {
      await api.delete(`/fila/${id}`)
    } catch (error) {
      console.error("Erro ao remover cliente da fila:", error)
      throw error
    }
  },
}

export default filaService

