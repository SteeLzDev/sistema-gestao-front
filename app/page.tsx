"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, Package, ClipboardList, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { InventoryStatus } from "@/components/dashboard/inventory-status"
import { ServiceQueue } from "@/components/dashboard/service-queue"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados para o dashboard
const mockData = {
  totalSales: 12890.75,
  salesGrowth: 14.5,
  totalCustomers: 342,
  customersGrowth: 7.2,
  totalProducts: 189,
  lowStockProducts: 12,
  queueWaiting: 8,
  queueInService: 3,
}

export default function DashboardPage() {
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulação de carregamento de dados da API
    const fetchData = async () => {
      try {
        setLoading(true)
        // Em um cenário real, você faria uma chamada à API aqui
        // const response = await fetch('/api/dashboard')
        // const data = await response.json()

        // Simulando um atraso de rede
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Usando dados simulados por enquanto
        setData(mockData)
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Relatório</Button>
          <Button>Atualizar Dados</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
          <TabsTrigger value="queue">Fila</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : `R$ ${data.totalSales.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  {data.salesGrowth > 0 ? (
                    <span className="flex items-center text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />+{data.salesGrowth}% em relação ao mês anterior
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      {data.salesGrowth}% em relação ao mês anterior
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : data.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  {data.customersGrowth > 0 ? (
                    <span className="flex items-center text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />+{data.customersGrowth}% em relação ao mês anterior
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      {data.customersGrowth}% em relação ao mês anterior
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : data.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={data.lowStockProducts > 10 ? "text-amber-600" : "text-muted-foreground"}>
                    {data.lowStockProducts} produtos com estoque baixo
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fila de Atendimento</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : data.queueWaiting + data.queueInService}</div>
                <p className="text-xs text-muted-foreground">
                  {data.queueWaiting} aguardando, {data.queueInService} em atendimento
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>Vendas mensais do ano atual</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
                <CardDescription>Últimas 5 vendas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Vendas Detalhadas</CardTitle>
              <CardDescription>Análise detalhada de vendas por período</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Status do Estoque</CardTitle>
              <CardDescription>Produtos com estoque baixo e mais vendidos</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryStatus />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Fila de Atendimento</CardTitle>
              <CardDescription>Clientes aguardando e em atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceQueue />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

