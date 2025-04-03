"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowUpRight, Package, DollarSign, Users, Clock } from 'lucide-react'
import Link from "next/link"
import { AvatarWithFallback } from "@/components/ui/avatar-fallback"

// Componentes importados dos arquivos compartilhados
// import { Overview } from "@/components/dashboard/overview"
// import { RecentSales } from "@/components/dashboard/recent-sales"
// import { DashboardQueue } from "@/components/dashboard/dashboard-queue"
// import { InventoryStatus } from "@/components/dashboard/inventory-status"

// Dados mockados para vendas recentes
const recentSales = [
  {
    id: 1,
    customer: "João Silva",
    email: "joao.silva@example.com",
    amount: 259.99,
  },
  {
    id: 2,
    customer: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    amount: 478.5,
  },
  {
    id: 3,
    customer: "Pedro Santos",
    email: "pedro.santos@example.com",
    amount: 189.9,
  },
  {
    id: 4,
    customer: "Ana Costa",
    email: "ana.costa@example.com",
    amount: 325.75,
  },
  {
    id: 5,
    customer: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    amount: 592.3,
  },
]

// Dados mockados para produtos com estoque baixo
const lowStockProducts = [
  {
    id: 1,
    name: "Óleo de Motor 5W30",
    category: "Lubrificantes",
    price: 39.9,
    stock: 3,
  },
  {
    id: 2,
    name: "Filtro de Ar - Modelo X",
    category: "Filtros",
    price: 25.5,
    stock: 2,
  },
  {
    id: 3,
    name: "Pastilha de Freio - Modelo Y",
    category: "Freios",
    price: 89.9,
    stock: 4,
  },
]

// Dados mockados para clientes na fila
const queueClients = [
  {
    id: 1,
    nome: "Roda Michelin",
    servico: "Troca de Marcha",
    chegada: "04:44",
    espera: "cerca de 24 horas",
    status: "Em Atendimento",
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card de Vendas Totais */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1,00</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+14.5%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        {/* Card de Estoque */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">0 produtos com estoque baixo</p>
          </CardContent>
        </Card>

        {/* Card de Fila de Clientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fila de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Clientes aguardando atendimento</p>
          </CardContent>
        </Card>

        {/* Card de Vendas Pendentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Vendas aguardando finalização</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Vendas Recentes */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>As últimas 5 vendas realizadas no sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
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
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/vendas">
                Ver todas as vendas <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Produtos com Estoque Baixo */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>Produtos que precisam ser repostos em breve.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Carregando produtos...
                    </TableCell>
                  </TableRow>
                ) : lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(product.price)}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Nenhum produto com estoque baixo
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/estoque">
                Gerenciar estoque <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Clientes na Fila */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Clientes na Fila</CardTitle>
            <CardDescription>Clientes aguardando atendimento.</CardDescription>
          </CardHeader>
          <CardContent>
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
                {queueClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.nome}</TableCell>
                    <TableCell>{client.servico}</TableCell>
                    <TableCell>{client.chegada}</TableCell>
                    <TableCell>{client.espera}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800">
                        {client.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/fila">
                Gerenciar fila <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Vendas Pendentes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Vendas Pendentes</CardTitle>
            <CardDescription>Vendas que precisam ser finalizadas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Carregando vendas...
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Nenhuma venda pendente no momento
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/vendas">
                Ver todas as vendas <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}