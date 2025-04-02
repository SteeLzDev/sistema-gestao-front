"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { filaService } from "@/services/filaService"
import type { Cliente, Atendimento } from "@/types/fila"

export function ServiceQueue() {
  const [clientesNaFila, setClientesNaFila] = useState<Cliente[]>([])
  const [clientesEmAtendimento, setClientesEmAtendimento] = useState<Atendimento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Buscar clientes na fila e em atendimento usando o serviço existente
        const [fila, atendimento] = await Promise.all([
          filaService.getClientesNaFila(),
          filaService.getClientesEmAtendimento(),
        ])
        setClientesNaFila(fila)
        setClientesEmAtendimento(atendimento)
      } catch (error) {
        console.error("Erro ao carregar dados da fila:", error)
        // Usar dados mockados em caso de erro
        setClientesNaFila([
          {
            id: 1,
            nome: "Roberto Almeida",
            servico: "Troca de Óleo",
            chegada: new Date().toISOString(),
            prioridade: "normal",
          },
        ])
        setClientesEmAtendimento([
          {
            id: 2,
            nome: "Fernanda Lima",
            servico: "Revisão Completa",
            inicio: new Date(Date.now() - 30 * 60000).toISOString(),
            atendente: "Carlos Silva",
            status: "em_atendimento",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Função para formatar a hora de chegada
  const formatArrivalTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "HH:mm", { locale: ptBR })
    } catch (error) {
      return "--:--"
    }
  }

  // Função para calcular o tempo de espera
  const calculateWaitingTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        locale: ptBR,
        addSuffix: false,
      })
    } catch (error) {
      return "--"
    }
  }

  // Combinar clientes na fila e em atendimento para exibição
  const allClients = [
    ...clientesNaFila.map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome,
      servico: cliente.servico,
      chegada: cliente.chegada,
      status: "waiting" as const,
      prioridade: cliente.prioridade,
    })),
    ...clientesEmAtendimento.map((atendimento) => ({
      id: atendimento.id,
      nome: atendimento.nome,
      servico: atendimento.servico,
      chegada: atendimento.inicio,
      status: "in_service" as const,
      prioridade: "normal" as const, // Assumindo prioridade normal para atendimentos em andamento
    })),
  ]

  if (loading && allClients.length === 0) {
    return <div className="flex justify-center p-4">Carregando fila de atendimento...</div>
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Clientes na Fila</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Chegada</TableHead>
            <TableHead>Espera</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allClients.length > 0 ? (
            allClients.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nome}</TableCell>
                <TableCell>{item.servico}</TableCell>
                <TableCell>{formatArrivalTime(item.chegada)}</TableCell>
                <TableCell>{calculateWaitingTime(item.chegada)}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "waiting" ? "outline" : "secondary"}
                    className={`whitespace-nowrap ${item.prioridade === "alta" ? "border-amber-500 text-amber-500" : ""}`}
                  >
                    {item.status === "waiting" ? "Aguardando" : "Em Atendimento"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Não há clientes na fila no momento
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

