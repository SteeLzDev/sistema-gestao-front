import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados simulados para fila de atendimento
const queueData = [
  {
    id: 1,
    customer: "Roberto Almeida",
    service: "Troca de Óleo",
    status: "waiting",
    arrivalTime: "2023-11-15T09:30:00Z",
    priority: "normal",
  },
  {
    id: 2,
    customer: "Fernanda Lima",
    service: "Revisão Completa",
    status: "in_service",
    arrivalTime: "2023-11-15T08:45:00Z",
    priority: "high",
  },
  {
    id: 3,
    customer: "Marcelo Souza",
    service: "Alinhamento e Balanceamento",
    status: "waiting",
    arrivalTime: "2023-11-15T10:15:00Z",
    priority: "normal",
  },
  {
    id: 4,
    customer: "Juliana Pereira",
    service: "Troca de Pastilhas de Freio",
    status: "waiting",
    arrivalTime: "2023-11-15T10:30:00Z",
    priority: "high",
  },
  {
    id: 5,
    customer: "Ricardo Gomes",
    service: "Diagnóstico Eletrônico",
    status: "in_service",
    arrivalTime: "2023-11-15T09:00:00Z",
    priority: "normal",
  },
]

export function ServiceQueue() {
  // Função para formatar a hora de chegada
  const formatArrivalTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  // Função para calcular o tempo de espera
  const calculateWaitingTime = (dateString: string) => {
    const arrivalTime = new Date(dateString).getTime()
    const currentTime = new Date().getTime()
    const waitingTimeMs = currentTime - arrivalTime

    const minutes = Math.floor(waitingTimeMs / (1000 * 60))
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}min`
    }
    return `${minutes}min`
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
          {queueData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.customer}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>{formatArrivalTime(item.arrivalTime)}</TableCell>
              <TableCell>{calculateWaitingTime(item.arrivalTime)}</TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "waiting" ? "outline" : "secondary"}
                  className={`whitespace-nowrap ${item.priority === "high" ? "border-amber-500 text-amber-500" : ""}`}
                >
                  {item.status === "waiting" ? "Aguardando" : "Em Atendimento"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

