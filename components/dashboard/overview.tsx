"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { dashboardService, type SalesData } from "@/services/dashboardService"
import { useToast } from "@/components/ui/use-toast"

// Dados mockados como fallback
const mockData = [
  { name: "Jan", total: 8400 },
  { name: "Fev", total: 7300 },
  { name: "Mar", total: 9800 },
  { name: "Abr", total: 8900 },
  { name: "Mai", total: 11200 },
  { name: "Jun", total: 9300 },
  { name: "Jul", total: 10800 },
  { name: "Ago", total: 12500 },
  { name: "Set", total: 11900 },
  { name: "Out", total: 13100 },
  { name: "Nov", total: 12400 },
  { name: "Dez", total: 14800 },
]

export function Overview() {
  const [data, setData] = useState<SalesData[]>(mockData)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const salesData = await dashboardService.getMonthlySales()
        setData(salesData)
      } catch (error) {
        console.error("Erro ao carregar dados de vendas mensais:", error)
        toast({
          title: "Erro ao carregar gráfico",
          description: "Não foi possível carregar os dados de vendas mensais. Usando dados de exemplo.",
          variant: "destructive",
        })
        // Fallback para dados mockados em caso de erro
        setData(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `R$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Total"]}
          labelFormatter={(label: string) => `Mês: ${label}`}
        />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

