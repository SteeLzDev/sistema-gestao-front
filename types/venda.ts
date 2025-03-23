// DTO para enviar ao backend
export interface ItemVendaDTO {
  produtoId: number
  produtoNome: string
  quantidade: number
  precoUnitario?: number
  subtotal?: number
}

export interface VendaDTO {
  cliente: string
  dataHora?: string
  valorTotal?: number
  itens: ItemVendaDTO[]
}

// Tipos para uso interno no frontend
export interface ItemVendaForm {
  produto: {
    id: number
    nome: string
    preco: number
  }
  quantidade: number
  precoUnitario: number
  subtotal: number
}

export interface VendaForm {
  cliente: string
  itens: ItemVendaForm[]
}

