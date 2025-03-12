"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash } from "lucide-react"
import { produtoService } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"
import { ProdutoForm } from "@/components/ui/ProdutoForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EstoquePage() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduto, setEditingProduto] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    carregarProdutos()
  }, [])

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await produtoService.listarProdutos()
      setProdutos(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      setError("Não foi possível carregar os produtos. Verifique se o servidor está rodando.")
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removerProduto = async (id: number) => {
    try {
      await produtoService.removerProduto(id)
      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso.",
      })
      carregarProdutos()
    } catch (error) {
      console.error("Erro ao remover produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o produto.",
        variant: "destructive",
      })
    }
  }

  const handleSaveProduto = () => {
    setIsDialogOpen(false)
    setEditingProduto(null)
    carregarProdutos()
  }

  if (loading) {
    return <div>Carregando produtos...</div>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Button onClick={carregarProdutos}>Tentar novamente</Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Controle de Estoque</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduto(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduto ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
              <DialogDescription>Preencha os detalhes do produto abaixo.</DialogDescription>
            </DialogHeader>
            <ProdutoForm produto={editingProduto} onSave={handleSaveProduto} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Total de produtos: {produtos.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nome do Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço Unit.</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto: any) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.codigo}</TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className="text-right">{produto.quantidade}</TableCell>
                  <TableCell className="text-right">R$ {produto.preco.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="ghost" onClick={() => setEditingProduto(produto)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Produto</DialogTitle>
                            <DialogDescription>Edite os detalhes do produto abaixo.</DialogDescription>
                          </DialogHeader>
                          <ProdutoForm
                            produto={editingProduto}
                            onSave={handleSaveProduto}
                            onCancel={() => setIsDialogOpen(false)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button size="icon" variant="ghost" onClick={() => removerProduto(produto.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

