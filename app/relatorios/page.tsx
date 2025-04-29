"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Download, FileText, ArrowLeft } from 'lucide-react'
import { dashboardService, type SalesData, type RecentSale } from "@/services/dashboardService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Overview } from "@/components/dashboard/overview"
import type { DateRange } from "react-day-picker"
import { jsPDF } from "jspdf"
import { BackButton } from "@/components/ui/BackButton"

export default function RelatoriosPage() {
  const router = useRouter()
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [recentSales, setRecentSales] = useState<RecentSale[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [monthlySales, sales] = await Promise.all([
          dashboardService.getMonthlySales(),
          dashboardService.getRecentSales(),
        ])
        setSalesData(monthlySales)
        setRecentSales(sales)
      } catch (error) {
        console.error("Erro ao carregar dados de relatórios:", error)
        toast({
          title: "Erro ao carregar relatórios",
          description: "Não foi possível carregar os dados dos relatórios.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const exportToCSV = () => {
    try {
      // Cabeçalho do CSV
      let csvContent = "data:text/csv;charset=utf-8,Data,Cliente,Email,Valor,Status\n"

      // Adicionar dados de vendas
      recentSales.forEach((sale) => {
        const formattedDate = format(new Date(sale.date), "dd/MM/yyyy")
        const formattedAmount = sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
        const row = `${formattedDate},"${sale.customer}","${sale.email}",${formattedAmount},${sale.status}\n`
        csvContent += row
      })

      // Criar link para download
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `relatorio-vendas-${format(new Date(), "dd-MM-yyyy")}.csv`)
      document.body.appendChild(link)

      // Trigger download
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Relatório exportado",
        description: "O relatório foi exportado com sucesso em formato CSV.",
      })
    } catch (error) {
      console.error("Erro ao exportar relatório CSV:", error)
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar o relatório em CSV.",
        variant: "destructive",
      })
    }
  }

  const exportToPDF = () => {
    try {
      // Criar novo documento PDF
      const doc = new jsPDF()

      // Adicionar título
      doc.setFontSize(18)
      doc.text("Relatório de Vendas", 14, 22)

      // Adicionar período do relatório
      doc.setFontSize(12)
      const periodoTexto =
        dateRange?.from && dateRange?.to
          ? `Período: ${format(dateRange.from, "dd/MM/yyyy")} a ${format(dateRange.to, "dd/MM/yyyy")}`
          : "Período: Todos os registros"
      doc.text(periodoTexto, 14, 30)

      // Adicionar data de geração
      doc.setFontSize(10)
      doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 36)

      // Adicionar resumo financeiro
      doc.setFontSize(14)
      doc.text("Resumo Financeiro", 14, 46)

      const totalSales = recentSales.reduce((sum, sale) => sum + sale.amount, 0)
      const ticketMedio = recentSales.length > 0 ? totalSales / recentSales.length : 0

      doc.setFontSize(10)
      doc.text(`Total de Vendas: R$ ${totalSales.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 14, 54)
      doc.text(`Quantidade de Vendas: ${recentSales.length}`, 14, 60)
      doc.text(`Ticket Médio: R$ ${ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 14, 66)

      // Adicionar tabela de vendas manualmente
      doc.setFontSize(14)
      doc.text("Vendas Detalhadas", 14, 76)

      // Cabeçalho da tabela
      doc.setFontSize(10)
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(66, 66, 66)
      doc.rect(14, 80, 180, 8, "F")
      doc.text("Data", 16, 85)
      doc.text("Cliente", 50, 85)
      doc.text("Email", 90, 85)
      doc.text("Valor", 140, 85)
      doc.text("Status", 170, 85)

      // Dados da tabela
      doc.setTextColor(0, 0, 0)
      let y = 90

      // Limitar a 20 registros para não exceder o tamanho da página
      const displaySales = recentSales.slice(0, 20)

      displaySales.forEach((sale, index) => {
        const isEven = index % 2 === 0
        if (isEven) {
          doc.setFillColor(240, 240, 240)
          doc.rect(14, y - 4, 180, 8, "F")
        }

        doc.text(format(new Date(sale.date), "dd/MM/yyyy"), 16, y)

        // Limitar o tamanho do nome do cliente para não ultrapassar a coluna
        const clientName = sale.customer.length > 20 ? sale.customer.substring(0, 17) + "..." : sale.customer
        doc.text(clientName, 50, y)

        // Limitar o tamanho do email
        const email = sale.email.length > 25 ? sale.email.substring(0, 22) + "..." : sale.email
        doc.text(email, 90, y)

        // Formatar valor
        doc.text(`R$ ${sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 140, y)

        // Status
        doc.text(sale.status === "completed" ? "Concluída" : "Pendente", 170, y)

        y += 8
      })

      // Adicionar nota se houver mais registros
      if (recentSales.length > 20) {
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text(`* Exibindo 20 de ${recentSales.length} registros. Exporte em CSV para ver todos os dados.`, 14, y + 5)
      }

      // Adicionar rodapé
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text("Página 1 de 1", 14, 285)
      doc.text("Sistema de Gestão - Relatório de Vendas", 100, 285)

      // Salvar o PDF
      doc.save(`relatorio-vendas-${format(new Date(), "dd-MM-yyyy")}.pdf`)

      toast({
        title: "Relatório exportado",
        description: "O relatório foi exportado com sucesso em formato PDF.",
      })
    } catch (error) {
      console.error("Erro ao exportar relatório PDF:", error)
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar o relatório em PDF.",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalSales = recentSales.reduce((sum, sale) => sum + sale.amount, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Relatórios Financeiros</h2>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  "Selecione o período"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={exportToCSV} className="flex gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Button onClick={exportToPDF} variant="outline" className="flex gap-2">
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sales">Vendas Detalhadas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visão geral das vendas no período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total de Vendas</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Quantidade de Vendas</h3>
                  <p className="text-2xl font-bold">{recentSales.length}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
                  <p className="text-2xl font-bold">
                    {recentSales.length > 0 ? formatCurrency(totalSales / recentSales.length) : formatCurrency(0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
              <CardDescription>Gráfico de vendas por mês</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Detalhadas</CardTitle>
              <CardDescription>Lista de todas as vendas realizadas no período</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-4">Carregando dados...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.length > 0 ? (
                      recentSales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>{format(new Date(sale.date), "dd/MM/yyyy HH:mm")}</TableCell>
                          <TableCell className="font-medium">{sale.customer}</TableCell>
                          <TableCell>{sale.email}</TableCell>
                          <TableCell className="text-right">{formatCurrency(sale.amount)}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                sale.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {sale.status === "completed" ? "Concluída" : "Pendente"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Nenhuma venda encontrada no período selecionado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}