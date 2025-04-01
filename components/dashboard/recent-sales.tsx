"use client"

import { useEffect, useState } from "react"
import { AvatarWithFallback } from "@/components/ui/avatar-fallback"
import { dashboardService, type RecentSale } from "@/services/dashboardService"
import { useToast } from "@/components/ui/use-toast"

// Dados mockados como fallback
const mockSales = [
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
  const [sales, setSales] = useState<RecentSale[]>(mockSales)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const recentSales = await dashboardService.getRecentSales()
        setSales(recentSales.length > 0 ? recentSales : mockSales)
      } catch (error) {
        console.error("Erro ao carregar vendas recentes:", error)
        toast({
          title: "Erro ao carregar vendas",
          description: "Não foi possível carregar as vendas recentes. Usando dados de exemplo.",
          variant: "destructive",
        })
        // Fallback para dados mockados em caso de erro
        setSales(mockSales)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return <div className="flex justify-center p-4">Carregando vendas recentes...</div>
  }

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <AvatarWithFallback name={sale.customer} className="h-9 w-9" />
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

