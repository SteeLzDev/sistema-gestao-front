// Definição dos tipos para a fila de atendimento

export interface Cliente {
  id: number
  nome: string
  servico: string
  chegada: string
  espera?: string
  prioridade: "normal" | "alta"
  telefone?: string
  status?: string
}

export interface Atendimento {
  id: number
  nome: string
  servico: string
  inicio: string
  atendente: string
  status: string
}

