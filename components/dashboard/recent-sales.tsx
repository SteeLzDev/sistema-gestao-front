import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados simulados para vendas recentes
const recentSales = [
  {
    id: 1,
    customer: "João Silva",
    email: "joao.silva@example.com",
    amount: 259.99,
    date: "2023-11-15T14:32:00Z",
    status: "completed",
  },
  {
    id: 2,
    customer: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    amount: 478.5,
    date: "2023-11-15T10:15:00Z",
    status: "completed",
  },
  {
    id: 3,
    customer: "Pedro Santos",
    email: "pedro.santos@example.com",
    amount: 189.9,
    date: "2023-11-14T16:45:00Z",
    status: "completed",
  },
  {
    id: 4,
    customer: "Ana Costa",
    email: "ana.costa@example.com",
    amount: 325.75,
    date: "2023-11-14T09:20:00Z",
    status: "completed",
  },
  {
    id: 5,
    customer: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    amount: 592.3,
    date: "2023-11-13T15:10:00Z",
    status: "completed",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={sale.customer} />
            <AvatarFallback>
              {sale.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(sale.amount)}
          </div>
        </div>
      ))}
    </div>
  )
}

