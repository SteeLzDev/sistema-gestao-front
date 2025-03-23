"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendaService } from "@/services/vendaService"
import { Header } from "@/components/header-no-theme"
import Link from "next/link"
import { formatarData, formatarMoeda } from "@/lib/utils"

export default function VendasPage() {
  const [vendas, setVendas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarVendas = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await vendaService.listarVendas()
        console.log("Vendas carregadas:", data) // Log para depuração
        setVendas(data)
      } catch (err) {
        console.error("Erro ao carregar vendas:", err)
        setError("Erro ao carregar vendas. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    carregarVendas()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gerenciamento de Vendas</h1>
            <div className="space-x-2">
              <Button asChild>
                <Link href="/vendas/simples">Nova Venda (Simplificada)</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/vendas/nova-venda">Nova Venda (Original)</Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center">Carregando vendas...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : vendas.length === 0 ? (
                <p className="text-center text-muted-foreground">Nenhuma venda registrada.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendas.map((venda) => (
                      <TableRow key={venda.id}>
                        <TableCell>{venda.id}</TableCell>
                        <TableCell>{venda.cliente}</TableCell>
                        <TableCell>{formatarData(venda.dataHora)}</TableCell>
                        <TableCell>{formatarMoeda(venda.valorTotal)}</TableCell>
                        <TableCell>
                          <Button size="sm" asChild>
                            <Link href={`/vendas/detalhes?id=${venda.id}`}>Detalhes</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

