import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, BarChart, PieChart, LineChart, TrendingUp } from "lucide-react"

export default function RelatoriosPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Selecione o período e tipo de relatório</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Período</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="ontem">Ontem</SelectItem>
                    <SelectItem value="semana">Esta semana</SelectItem>
                    <SelectItem value="mes">Este mês</SelectItem>
                    <SelectItem value="trimestre">Este trimestre</SelectItem>
                    <SelectItem value="ano">Este ano</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Selecione a data</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Final</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Selecione a data</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 28.450,00</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+12%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+8%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 196,21</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+3.5%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lucro Estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 11.380,00</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+10%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="diario" className="space-y-4">
          <TabsList>
            <TabsTrigger value="diario">Diário</TabsTrigger>
            <TabsTrigger value="semanal">Semanal</TabsTrigger>
            <TabsTrigger value="mensal">Mensal</TabsTrigger>
            <TabsTrigger value="anual">Anual</TabsTrigger>
          </TabsList>
          <TabsContent value="diario" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vendas por Hora</CardTitle>
                  <CardDescription>Análise de vendas do dia 10/03/2025</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="h-full w-full">
                    <div className="flex h-full items-end gap-2">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const hour = 8 + i
                        const height = Math.max(15, Math.floor(Math.random() * 100))
                        return (
                          <div key={i} className="relative flex-1">
                            <div
                              className="bg-primary/90 hover:bg-primary rounded-t-md transition-all"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="mt-2 text-xs text-center">{`${hour}:00`}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="semanal" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vendas por Dia da Semana</CardTitle>
                  <CardDescription>Análise de vendas da semana de 04/03/2025 a 10/03/2025</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="h-full w-full">
                    <div className="flex h-full items-end gap-6">
                      {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, i) => {
                        const height = Math.max(20, Math.floor(Math.random() * 100))
                        return (
                          <div key={i} className="relative flex-1">
                            <div
                              className="bg-primary/90 hover:bg-primary rounded-t-md transition-all"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="mt-2 text-xs text-center">{day}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mensal" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vendas por Dia do Mês</CardTitle>
                  <CardDescription>Análise de vendas do mês de Março/2025</CardDescription>
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Aqui seria renderizado um gráfico de linha para vendas diárias do mês */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de vendas por dia do mês seria exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="anual" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vendas por Mês</CardTitle>
                  <CardDescription>Análise de vendas do ano de 2025</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Aqui seria renderizado um gráfico de barras para vendas mensais do ano */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de vendas por mês seria exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>Top 5 produtos com maior volume de vendas</CardDescription>
              </div>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { nome: "Óleo de Motor 5W30", qtd: 45, valor: "R$ 1.615,50" },
                  { nome: "Filtro de Ar Universal", qtd: 38, valor: "R$ 855,00" },
                  { nome: "Bateria 60Ah", qtd: 22, valor: "R$ 7.700,00" },
                  { nome: "Pastilha de Freio Dianteira", qtd: 18, valor: "R$ 1.618,20" },
                  { nome: "Fluido de Freio DOT4", qtd: 15, valor: "R$ 427,50" },
                ].map((produto, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{produto.nome}</div>
                      <div className="text-sm text-muted-foreground">{produto.qtd} unidades</div>
                    </div>
                    <div className="font-medium">{produto.valor}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Serviços Mais Realizados</CardTitle>
                <CardDescription>Top 5 serviços com maior demanda</CardDescription>
              </div>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { nome: "Troca de Óleo", qtd: 32, valor: "R$ 3.840,00" },
                  { nome: "Revisão Geral", qtd: 18, valor: "R$ 4.500,00" },
                  { nome: "Alinhamento e Balanceamento", qtd: 15, valor: "R$ 1.350,00" },
                  { nome: "Troca de Pneus", qtd: 12, valor: "R$ 4.800,00" },
                  { nome: "Manutenção de Freios", qtd: 10, valor: "R$ 2.500,00" },
                ].map((servico, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{servico.nome}</div>
                      <div className="text-sm text-muted-foreground">{servico.qtd} realizados</div>
                    </div>
                    <div className="font-medium">{servico.valor}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

