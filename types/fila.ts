export interface Cliente {
    id: number
    nome: string
    telefone?: string
    servico: string
    prioridade: string
    chegada?: string | Date
    espera?: string
    status: string
  }
  
  export interface Atendimento {
    id: number
    nome: string
    servico: string
    inicio: string | Date
    atendente: string
    status: string
  }
  
  