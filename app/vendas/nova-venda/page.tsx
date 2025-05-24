"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import produtoService  from "@/services/produtoService"
import { vendaService } from "@/services/vendaService"
import type { Produto } from "@/types/produto"
import type { ItemVendaForm } from "@/types/venda"
import { Header } from "@/components/header-no-theme"
import { useRouter } from "next/navigation"
import { formatarMoeda } from "@/lib/utils"

export default function NovaVendaPage() {
  const router = useRouter()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [itensVenda, setItensVenda] = useState<ItemVendaForm[]>([])
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<string>("")
  const [quantidade, setQuantidade] = useState(1)
  const [cliente, setCliente] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await produtoService.listarProdutos()
        setProdutos(data)
      } catch (err) {
        console.error("Erro ao carregar produtos:", err)
        setError("Erro ao carregar produtos. Tente novamente.")
      }
    }

    carregarProdutos()
  }, [])

  const handleProdutoChange = (produtoId: string) => {
    setProdutoSelecionadoId(produtoId)
    setQuantidade(1)
  }

  const handleAdicionarItem = () => {
    if (!produtoSelecionadoId) {
      setError("Selecione um produto")
      return
    }

    const produtoSelecionado = produtos.find((p) => p.id.toString() === produtoSelecionadoId)

    if (!produtoSelecionado) {
      setError("Produto não encontrado")
      return
    }

    if (quantidade <= 0) {
      setError("A quantidade deve ser maior que zero")
      return
    }

    if (quantidade > produtoSelecionado.quantidade) {
      setError("Quantidade indisponível em estoque")
      return
    }

    const itemExistente = itensVenda.find((item) => item.produto.id === produtoSelecionado.id)

    if (itemExistente) {
      // Atualizar quantidade do item existente
      const novosItens = itensVenda.map((item) => {
        if (item.produto.id === produtoSelecionado.id) {
          const novaQuantidade = item.quantidade + quantidade
          if (novaQuantidade > produtoSelecionado.quantidade) {
            setError("Quantidade total excede o estoque disponível")
            return item
          }
          return {
            ...item,
            quantidade: novaQuantidade,
            subtotal: produtoSelecionado.preco * novaQuantidade,
          }
        }
        return item
      })

      if (!error) {
        setItensVenda(novosItens)
        setProdutoSelecionadoId("")
        setQuantidade(1)
        setError(null)
      }
    } else {
      // Adicionar novo item com apenas as propriedades necessárias
      const novoItem: ItemVendaForm = {
        produto: {
          id: produtoSelecionado.id,
          nome: produtoSelecionado.nome,
          preco: 0
        },
        quantidade,
        precoUnitario: produtoSelecionado.preco,
        subtotal: produtoSelecionado.preco * quantidade,
      }

      setItensVenda([...itensVenda, novoItem])
      setProdutoSelecionadoId("")
      setQuantidade(1)
      setError(null)
    }
  }

  const handleRemoverItem = (index: number) => {
    const novosItens = [...itensVenda]
    novosItens.splice(index, 1)
    setItensVenda(novosItens)
  }

  const calcularTotal = () => {
    return itensVenda.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (itensVenda.length === 0) {
      setError("Adicione pelo menos um item à venda")
      return
    }

    if (!cliente.trim()) {
      setError("Informe o nome do cliente")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await vendaService.registrarVenda({
        cliente,
        itens: itensVenda,
      })

      alert("Venda registrada com sucesso!")
      router.push("/vendas")
    } catch (err: any) {
      console.error("Erro ao registrar venda:", err)
      setError(err.message || "Erro ao registrar venda. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 space-y-6">
          <h1 className="text-2xl font-bold">Nova Venda</h1>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Dados da Venda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        id="cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        placeholder="Nome do cliente"
                        required
                      />
                    </div>
                    <div>
                      <Label>Data</Label>
                      <Input value={new Date().toLocaleString()} disabled />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Adicionar Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="produto">Produto</Label>
                    <Select value={produtoSelecionadoId} onValueChange={handleProdutoChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos.map((produto) => (
                          <SelectItem key={produto.id} value={produto.id.toString()}>
                            {produto.nome} - {formatarMoeda(produto.preco)} ({produto.quantidade} em estoque)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantidade">Quantidade</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="1"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={handleAdicionarItem}
                      disabled={!produtoSelecionadoId}
                      className="w-full"
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div>
                  <h3 className="text-lg font-medium mb-2">Itens da Venda</h3>
                  {itensVenda.length === 0 ? (
                    <p className="text-muted-foreground">Nenhum item adicionado</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Preço Unit.</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Subtotal</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {itensVenda.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.produto.nome}</TableCell>
                            <TableCell>{formatarMoeda(item.precoUnitario)}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>{formatarMoeda(item.subtotal)}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoverItem(index)}
                              >
                                Remover
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-bold">
                            Total:
                          </TableCell>
                          <TableCell className="font-bold">{formatarMoeda(calcularTotal())}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/vendas")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading || itensVenda.length === 0}>
                {loading ? "Registrando..." : "Finalizar Venda"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

