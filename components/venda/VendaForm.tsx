"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import produtoService from "@/services/produtoService"
import vendaService from "@/services/vendaService"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"

interface Produto {
  id: number
  codigo: string
  nome: string
  preco: number
  quantidade: number
}

interface ItemVenda {
  produtoId: number
  produtoNome: string
  quantidade: number
  precoUnitario: number
  subtotal: number
}

interface VendaFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function VendaForm({ onSuccess, onCancel }: VendaFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [cliente, setCliente] = useState("")
  const [selectedProdutoId, setSelectedProdutoId] = useState<number | null>(null)
  const [quantidade, setQuantidade] = useState(1)
  const [itens, setItens] = useState<ItemVenda[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingProdutos, setLoadingProdutos] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    carregarProdutos()
  }, [])

  const carregarProdutos = async () => {
    try {
      setLoadingProdutos(true)
      const data = await produtoService.listarProdutos()
      setProdutos(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      })
    } finally {
      setLoadingProdutos(false)
    }
  }

  const handleAddItem = () => {
    if (!selectedProdutoId || quantidade <= 0) {
      toast({
        title: "Erro",
        description: "Selecione um produto e informe uma quantidade válida.",
        variant: "destructive",
      })
      return
    }

    const produto = produtos.find((p) => p.id === selectedProdutoId)
    if (!produto) return

    if (quantidade > produto.quantidade) {
      toast({
        title: "Erro",
        description: `Quantidade indisponível. Estoque atual: ${produto.quantidade}`,
        variant: "destructive",
      })
      return
    }

    const itemExistente = itens.findIndex((item) => item.produtoId === selectedProdutoId)

    if (itemExistente >= 0) {
      const novaQuantidade = itens[itemExistente].quantidade + quantidade

      if (novaQuantidade > produto.quantidade) {
        toast({
          title: "Erro",
          description: `Quantidade indisponível. Estoque atual: ${produto.quantidade}`,
          variant: "destructive",
        })
        return
      }

      const novosItens = [...itens]
      novosItens[itemExistente] = {
        ...novosItens[itemExistente],
        quantidade: novaQuantidade,
        subtotal: novaQuantidade * produto.preco,
      }

      setItens(novosItens)
    } else {
      const novoItem: ItemVenda = {
        produtoId: produto.id,
        produtoNome: produto.nome,
        quantidade: quantidade,
        precoUnitario: produto.preco,
        subtotal: quantidade * produto.preco,
      }

      setItens([...itens, novoItem])
    }

    setSelectedProdutoId(null)
    setQuantidade(1)
  }

  const handleRemoveItem = (index: number) => {
    const novosItens = [...itens]
    novosItens.splice(index, 1)
    setItens(novosItens)
  }

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (itens.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à venda.",
        variant: "destructive",
      })
      return
    }

    if (!cliente.trim()) {
      toast({
        title: "Erro",
        description: "Informe o nome do cliente.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const venda = {
        cliente,
        itens: itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      }

      await vendaService.registrarVenda(venda)

      toast({
        title: "Sucesso",
        description: "Venda registrada com sucesso.",
      })
      onSuccess()
    } catch (error: any) {
      console.error("Erro ao registrar venda:", error)

      // Mensagem de erro mais amigável
      const errorMessage =
        error.message || "Não foi possível registrar a venda. Verifique sua conexão e tente novamente."

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="cliente">Nome do Cliente</Label>
        <Input
          id="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ex: João Silva"
          required
        />
      </div>

      <div className="grid grid-cols-12 gap-2 items-end">
        <div className="col-span-12 md:col-span-6">
          <Label htmlFor="produto">Produto</Label>
          <Select
            value={selectedProdutoId?.toString() || ""}
            onValueChange={(value) => setSelectedProdutoId(Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={produto.id.toString()}>
                  {produto.nome} - R$ {produto.preco.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-6 md:col-span-3">
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantidade"
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(Number.parseInt(e.target.value))}
            required
          />
        </div>

        <div className="col-span-6 md:col-span-3">
          <Button type="button" onClick={handleAddItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Preço Unit.</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  Nenhum item adicionado
                </TableCell>
              </TableRow>
            ) : (
              itens.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {item.produtoNome}
                    <div className="sm:hidden text-xs text-muted-foreground mt-1">
                      R$ {item.precoUnitario.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right">R$ {item.precoUnitario.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.quantidade}</TableCell>
                  <TableCell className="text-right">R$ {item.subtotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => handleRemoveItem(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
        <div className="text-lg font-bold order-2 sm:order-1">Total: R$ {calcularTotal().toFixed(2)}</div>
        <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="flex-1 sm:flex-auto">
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || itens.length === 0} className="flex-1 sm:flex-auto">
            {loading ? "Registrando..." : "Finalizar Venda"}
          </Button>
        </div>
      </div>
    </form>
  )
}

