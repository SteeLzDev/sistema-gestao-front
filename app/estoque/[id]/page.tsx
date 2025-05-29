"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import produtoService from "@/services/produtoService"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Edit, Trash, Package, AlertCircle, Plus, Minus } from "lucide-react"
import { ProdutoForm } from "@/components/produto/ProdutoForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProdutoDetalhesPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const { toast } = useToast()
  const [produto, setProduto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [estoqueDialogOpen, setEstoqueDialogOpen] = useState(false)
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0)
  const [tipoOperacao, setTipoOperacao] = useState<"adicionar" | "remover">("adicionar")

  useEffect(() => {
    // Verificar se há token de autenticação
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("Token não encontrado - redirecionando para login")
      router.push("/login")
      return
    }

    if (id) {
      carregarProduto()
    }
  }, [id, router])

  const carregarProduto = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!id) {
        throw new Error("ID do produto não fornecido")
      }

      console.log(`Carregando produto com ID: ${id}`)
      const data = await produtoService.obterProduto(Number(id))
      console.log("Produto carregado:", data)

      if (!data) {
        throw new Error("Produto não encontrado")
      }

      setProduto(data)
    } catch (error: any) {
      console.error("Erro ao carregar produto:", error)
      setError("Não foi possível carregar os detalhes do produto.")
      toast({
        title: "Erro",
        description: "Não foi possível carregar os detalhes do produto.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setFormDialogOpen(false)
    carregarProduto()
  }

  const handleDeleteConfirm = async () => {
    try {
      console.log(`Iniciando exclusão do produto ${produto.id}`)

      if (!produto?.id) {
        throw new Error("ID do produto não encontrado")
      }

      const result = await produtoService.excluirProduto(produto.id)
      console.log("Resultado da exclusão:", result)

      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso.",
      })

      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        router.push("/estoque")
      }, 1000)
    } catch (error: any) {
      console.error("Erro detalhado ao remover produto:", error)
      console.error("Response:", error.response)
      console.error("Status:", error.response?.status)
      console.error("Data:", error.response?.data)

      toast({
        title: "Erro",
        description: error.message || "Não foi possível remover o produto.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  const handleEstoqueOperation = async () => {
    try {
      if (quantidadeEstoque <= 0) {
        toast({
          title: "Erro",
          description: "A quantidade deve ser maior que zero.",
          variant: "destructive",
        })
        return
      }

      console.log(
        `${tipoOperacao === "adicionar" ? "Adicionando" : "Removendo"} ${quantidadeEstoque} unidades do produto ${produto.id}`,
      )

      if (tipoOperacao === "adicionar") {
        await produtoService.adicionarEstoque(produto.id, quantidadeEstoque)
        toast({
          title: "Sucesso",
          description: `${quantidadeEstoque} unidades adicionadas ao estoque.`,
        })
      } else {
        await produtoService.removerEstoque(produto.id, quantidadeEstoque)
        toast({
          title: "Sucesso",
          description: `${quantidadeEstoque} unidades removidas do estoque.`,
        })
      }

      setEstoqueDialogOpen(false)
      setQuantidadeEstoque(0)
      carregarProduto() // Recarregar para mostrar a quantidade atualizada
    } catch (error: any) {
      console.error("Erro ao atualizar estoque:", error)

      // Tratamento específico para estoque insuficiente
      if (error.response?.status === 400 && tipoOperacao === "remover") {
        toast({
          title: "Estoque Insuficiente",
          description: "Não há estoque suficiente para remover esta quantidade.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Erro",
          description: `Não foi possível ${tipoOperacao === "adicionar" ? "adicionar" : "remover"} estoque.`,
          variant: "destructive",
        })
      }
    }
  }

  const openEstoqueDialog = (operacao: "adicionar" | "remover") => {
    setTipoOperacao(operacao)
    setQuantidadeEstoque(0)
    setEstoqueDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando detalhes do produto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={carregarProduto}>Tentar novamente</Button>
              <Button variant="outline" onClick={() => router.push("/estoque")}>
                Voltar para Estoque
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!produto) {
    return (
      <div className="container py-6">
        <Card>
          <CardContent className="pt-6">
            <p>Produto não encontrado.</p>
            <Button variant="outline" onClick={() => router.push("/estoque")} className="mt-4">
              Voltar para Estoque
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/estoque")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Detalhes do Produto</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{produto.nome}</CardTitle>
              <CardDescription>Código: {produto.codigo}</CardDescription>
            </div>
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Categoria</h3>
              <p className="text-lg">{produto.categoria || "Não especificada"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Quantidade em Estoque</h3>
              <p className="text-lg font-semibold">{produto.quantidade} unidades</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Preço Unitário</h3>
              <p className="text-lg">R$ {produto.preco.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Valor Total em Estoque</h3>
              <p className="text-lg">R$ {(produto.quantidade * produto.preco).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openEstoqueDialog("adicionar")}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Estoque
            </Button>
            <Button variant="outline" onClick={() => openEstoqueDialog("remover")}>
              <Minus className="h-4 w-4 mr-2" />
              Remover Estoque
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setFormDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Diálogo de Formulário */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Atualize as informações do produto abaixo.</DialogDescription>
          </DialogHeader>
          <ProdutoForm produto={produto} onSuccess={handleFormSuccess} onCancel={() => setFormDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo de Gestão de Estoque */}
      <Dialog open={estoqueDialogOpen} onOpenChange={setEstoqueDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tipoOperacao === "adicionar" ? "Adicionar" : "Remover"} Estoque</DialogTitle>
            <DialogDescription>
              {tipoOperacao === "adicionar"
                ? "Adicione unidades ao estoque do produto."
                : "Remova unidades do estoque do produto."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                min="1"
                value={quantidadeEstoque}
                onChange={(e) => setQuantidadeEstoque(Number(e.target.value))}
                placeholder="Digite a quantidade"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEstoqueDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEstoqueOperation}>{tipoOperacao === "adicionar" ? "Adicionar" : "Remover"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{produto.nome}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
