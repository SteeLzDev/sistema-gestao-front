"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { filaService } from "@/services/filaService"
import type { Cliente, Atendimento } from "@/types/fila"

export function DashboardQueue() {
  const [clientesNaFila, setClientesNaFila] = useState<Cliente[]>([])
  const [clientesEmAtendimento, setClientesEmAtendimento] = useState<Atendimento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log("DashboardQueue: Buscando dados da fila...")

        // Buscar clientes na fila
        const fila = await filaService.getClientesNaFila()
        setClientesNaFila(Array.isArray(fila) ? fila : [])
        console.log("DashboardQueue: Clientes na fila carregados:", fila.length)

        // Buscar clientes em atendimento
        const atendimento = await filaService.getClientesEmAtendimento()
        setClientesEmAtendimento(Array.isArray(atendimento) ? atendimento : [])
        console.log("DashboardQueue: Clientes em atendimento carregados:", atendimento.length)
      } catch (error) {
        console.error("DashboardQueue: Erro ao carregar dados da fila:", error)
        setClientesNaFila([])
        setClientesEmAtendimento([])
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
      prioridade: "normal" as const,
    })),
  ].slice(0, 5) // Limitar a 5 itens para o dashboard

  if (loading && allClients.length === 0) {
    return <div className="flex justify-center p-4">Carregando fila de atendimento...</div>
  }

  return (
    <div>
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

