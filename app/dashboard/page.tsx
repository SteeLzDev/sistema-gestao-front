"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Header } from "@/components/header-no-theme"
import { dashboardService, type DashboardData } from "@/services/dashboardService"
import { formatarData, formatarMoeda } from "@/lib/utils"
import { AlertCircle, DollarSign, Package, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dashboardData = await dashboardService.getDashboardData()
        setData(dashboardData)
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err)
        setError("Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando dados do dashboard...</p>
        </main>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-red-50 p-4 rounded-md text-red-600 max-w-md text-center">
            <AlertCircle className="mx-auto mb-2 h-10 w-10" />
            <p>{error || "Não foi possível carregar os dados do dashboard."}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 space-y-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Vendas Recentes</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatarMoeda(data.vendasRecentes.itens.reduce((acc, item) => acc + item.valorTotal, 0))}
                </div>
                <p className="text-xs text-muted-foreground">{data.vendasRecentes.total} vendas nos últimos 30 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Estoque</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.estoque.total}</div>
                <p className="text-xs text-muted-foreground">{data.estoque.baixoEstoque} produtos com estoque baixo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fila de Atendimento</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.fila.aguardando}</div>
                <p className="text-xs text-muted-foreground">{data.fila.emAtendimento} clientes em atendimento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Serviços</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.servicos.pendentes}</div>
                <p className="text-xs text-muted-foreground">{data.servicos.concluidos} serviços concluídos hoje</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabelas de detalhes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendas Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
                <CardDescription>As últimas 5 vendas realizadas no sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.vendasRecentes.itens.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Nenhuma venda recente encontrada.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.vendasRecentes.itens.map((venda) => (
                        <TableRow key={venda.id}>
                          <TableCell>{venda.cliente}</TableCell>
                          <TableCell>{formatarData(venda.dataHora)}</TableCell>
                          <TableCell>{formatarMoeda(venda.valorTotal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 text-right">
                  <Link href="/vendas" className="text-sm text-blue-600 hover:underline">
                    Ver todas as vendas →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Produtos com Estoque Baixo */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos com Estoque Baixo</CardTitle>
                <CardDescription>Produtos que precisam ser repostos em breve.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.estoque.itens.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Nenhum produto com estoque baixo.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.estoque.itens.map((produto) => (
                        <TableRow key={produto.id}>
                          <TableCell>{produto.nome}</TableCell>
                          <TableCell>{formatarMoeda(produto.preco)}</TableCell>
                          <TableCell className="text-red-500 font-medium">{produto.quantidade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 text-right">
                  <Link href="/estoque" className="text-sm text-blue-600 hover:underline">
                    Gerenciar estoque →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Clientes na Fila */}
            <Card>
              <CardHeader>
                <CardTitle>Clientes na Fila</CardTitle>
                <CardDescription>Clientes aguardando atendimento.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.fila.itens.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Nenhum cliente na fila de atendimento.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.fila.itens.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{cliente.servico}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                cliente.status === "AGUARDANDO"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {cliente.status === "AGUARDANDO" ? "Aguardando" : "Em Atendimento"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 text-right">
                  <Link href="/fila" className="text-sm text-blue-600 hover:underline">
                    Gerenciar fila →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Serviços em Andamento */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços em Andamento</CardTitle>
                <CardDescription>Serviços que estão sendo realizados no momento.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.servicos.itens.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Nenhum serviço em andamento.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Início</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.servicos.itens.map((servico) => (
                        <TableRow key={servico.id}>
                          <TableCell>{servico.cliente}</TableCell>
                          <TableCell>{servico.descricao}</TableCell>
                          <TableCell>{servico.dataInicio ? formatarData(servico.dataInicio) : "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 text-right">
                  <Link href="/servicos" className="text-sm text-blue-600 hover:underline">
                    Ver todos os serviços →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

