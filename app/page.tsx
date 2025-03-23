import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Users, Package, ClipboardList, Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">Sistema de Gestão</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
              <Button variant="outline">
                <ClipboardList className="mr-2 h-4 w-4" />
                Nova Venda
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.250,00</div>
                <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">8 produtos com estoque baixo</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes na Fila</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Tempo médio: 15 min</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Serviços Pendentes</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">2 com prazo vencendo hoje</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="estoque" className="space-y-4">
            <TabsList className="w-full flex overflow-x-auto">
              <TabsTrigger value="estoque" className="flex-1">
                Estoque
              </TabsTrigger>
              <TabsTrigger value="vendas" className="flex-1">
                Vendas
              </TabsTrigger>
              <TabsTrigger value="clientes" className="flex-1">
                Fila
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="flex-1">
                Relatórios
              </TabsTrigger>
            </TabsList>
            <TabsContent value="estoque" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Controle de Estoque</CardTitle>
                  <CardDescription>Gerencie os produtos disponíveis na sua oficina/mercado.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium">
                      <div>Código</div>
                      <div>Nome</div>
                      <div>Categoria</div>
                      <div>Quantidade</div>
                      <div>Preço</div>
                    </div>
                    <div className="divide-y">
                      {[
                        { id: "001", nome: "Óleo de Motor", categoria: "Automotivo", qtd: 25, preco: "R$ 35,90" },
                        { id: "002", nome: "Filtro de Ar", categoria: "Automotivo", qtd: 18, preco: "R$ 22,50" },
                        { id: "003", nome: "Pastilha de Freio", categoria: "Automotivo", qtd: 12, preco: "R$ 89,90" },
                        { id: "004", nome: "Lâmpada de Farol", categoria: "Automotivo", qtd: 30, preco: "R$ 15,00" },
                        { id: "005", nome: "Bateria 60Ah", categoria: "Automotivo", qtd: 8, preco: "R$ 350,00" },
                      ].map((item) => (
                        <div key={item.id} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                          <div>{item.id}</div>
                          <div>{item.nome}</div>
                          <div>{item.categoria}</div>
                          <div>{item.qtd}</div>
                          <div>{item.preco}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vendas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Vendas</CardTitle>
                  <CardDescription>Visualize e registre novas vendas e serviços.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium">
                      <div>Nº</div>
                      <div>Cliente</div>
                      <div>Itens</div>
                      <div>Data</div>
                      <div>Total</div>
                    </div>
                    <div className="divide-y">
                      {[
                        { id: "V001", cliente: "João Silva", itens: 3, data: "10/03/2025", total: "R$ 145,80" },
                        { id: "V002", cliente: "Maria Oliveira", itens: 1, data: "10/03/2025", total: "R$ 350,00" },
                        { id: "V003", cliente: "Carlos Santos", itens: 5, data: "09/03/2025", total: "R$ 212,50" },
                        { id: "V004", cliente: "Ana Pereira", itens: 2, data: "09/03/2025", total: "R$ 125,90" },
                        { id: "V005", cliente: "Roberto Lima", itens: 4, data: "08/03/2025", total: "R$ 415,30" },
                      ].map((venda) => (
                        <div key={venda.id} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                          <div>{venda.id}</div>
                          <div>{venda.cliente}</div>
                          <div>{venda.itens}</div>
                          <div>{venda.data}</div>
                          <div>{venda.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="clientes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fila de Atendimento</CardTitle>
                  <CardDescription>Gerencie a fila de clientes aguardando atendimento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium">
                      <div>Posição</div>
                      <div>Nome</div>
                      <div>Serviço</div>
                      <div>Chegada</div>
                      <div>Ações</div>
                    </div>
                    <div className="divide-y">
                      {[
                        { pos: 1, nome: "Pedro Alves", servico: "Troca de Óleo", chegada: "09:15" },
                        { pos: 2, nome: "Juliana Costa", servico: "Revisão Geral", chegada: "09:30" },
                        { pos: 3, nome: "Marcos Souza", servico: "Troca de Pneus", chegada: "09:45" },
                      ].map((cliente, index) => (
                        <div key={index} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                          <div>{cliente.pos}</div>
                          <div>{cliente.nome}</div>
                          <div>{cliente.servico}</div>
                          <div>{cliente.chegada}</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Atender
                            </Button>
                            <Button size="sm" variant="destructive">
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Adicionar Cliente</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="relatorios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Financeiros</CardTitle>
                  <CardDescription>Visualize o desempenho financeiro por período.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Diário
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Semanal
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Mensal
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Anual
                    </Button>
                  </div>

                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="text-center text-sm text-muted-foreground">
                      Gráfico de vendas seria exibido aqui
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm">
                      {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((dia) => (
                        <div key={dia} className="flex flex-col items-center">
                          <div>{dia}</div>
                          <div className="mt-1 h-24 w-full bg-primary/10 relative">
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-primary"
                              style={{
                                height: `${Math.floor(Math.random() * 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-lg font-bold">Total da semana: R$ 5.842,50</div>
                      <div className="text-sm text-muted-foreground">4 - 10 Março, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

