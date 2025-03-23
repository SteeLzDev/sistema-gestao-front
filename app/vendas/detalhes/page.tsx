"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendaService } from "@/services/vendaService"
import { Header } from "@/components/header-no-theme"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { formatarData, formatarMoeda } from "@/lib/utils"

export default function DetalhesVendaPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [venda, setVenda] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError("ID da venda não especificado")
      setLoading(false)
      return
    }

    const carregarVenda = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await vendaService.obterVenda(Number.parseInt(id))
        setVenda(data)
      } catch (err: any) {
        console.error(`Erro ao carregar venda ${id}:`, err)
        setError(err.message || "Erro ao carregar detalhes da venda")
      } finally {
        setLoading(false)
      }
    }

    carregarVenda()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando detalhes da venda...</p>
        </main>
      </div>
    )
  }

  if (error || !venda) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">{error || "Venda não encontrada"}</p>
          <Button asChild>
            <Link href="/vendas">Voltar para Vendas</Link>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Detalhes da Venda #{venda.id}</h1>
            <Button asChild variant="outline">
              <Link href="/vendas">Voltar</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações da Venda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{venda.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{formatarData(venda.dataHora)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-medium">{formatarMoeda(venda.valorTotal)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">Concluída</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itens da Venda</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Preço Unit.</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venda.itens &&
                    venda.itens.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.produtoNome}</TableCell>
                        <TableCell>{item.precoUnitario ? formatarMoeda(item.precoUnitario) : "N/A"}</TableCell>
                        <TableCell>{item.quantidade || "N/A"}</TableCell>
                        <TableCell>{formatarMoeda(item.subtotal)}</TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">
                      Total:
                    </TableCell>
                    <TableCell className="font-bold">{formatarMoeda(venda.valorTotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button onClick={() => window.print()} variant="outline">
              Imprimir
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

