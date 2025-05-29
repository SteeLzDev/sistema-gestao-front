"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { PermissionGuard } from "@/components/auth/PermissionGuard"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash, RefreshCw, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import apiClient from "@/services/apiClient"
import { useRouter } from "next/navigation"
import { BackButton } from "@/components/ui/BackButton"
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
import produtoService from "@/services/produtoService"
import { useToast } from "@/components/ui/use-toast"

// Interface para o produto
interface Produto {
  id: number
  codigo: string
  nome: string
  quantidade: number
  preco: number
  categoria?: string
}

export default function InventoryPage() {
  const { hasPermission, refreshAuth } = useAuth()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(null)

  // Verificar se o usuário tem permissão para visualizar o estoque
  const canViewInventory = hasPermission(Permission.VIEW_INVENTORY) || hasPermission("ESTOQUE_VISUALIZAR")

  // Função para carregar produtos
  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Verificar se o usuário tem permissão
      if (!canViewInventory) {
        setError("Você não tem permissão para visualizar o estoque.")
        setLoading(false)
        return
      }

      const token = localStorage.getItem("token")
      console.log("Token ao carregar produtos:", token ? "Presente" : "Ausente")

      // Se não houver token, atualizar a autenticação
      if (!token) {
        await refreshAuth()
      }

      const response = await apiClient.get("/produtos")
      console.log("Produtos carregados:", response.data)
      setProdutos(response.data)
    } catch (error: any) {
      console.error("Erro ao carregar produtos:", error)

      let mensagemErro = "Não foi possível carregar os produtos. "

      if (error.response) {
        if (error.response.status === 404) {
          mensagemErro += "Endpoint não encontrado. Verifique o caminho da API."
        } else if (error.response.status === 403) {
          mensagemErro += "Você não tem permissão para acessar este recurso."
        } else if (error.response.status === 401) {
          mensagemErro += "Sua sessão expirou. Por favor, faça login novamente."
          // Redirecionar para login após um breve atraso
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else {
          mensagemErro += `Erro ${error.response.status}: ${error.response.data?.message || error.response.statusText}`
        }
      } else if (error.request) {
        mensagemErro += "Servidor não respondeu. Verifique se o servidor está rodando."
      } else {
        mensagemErro += error.message
      }

      setError(mensagemErro)
    } finally {
      setLoading(false)
    }
  }

  // Função para confirmar exclusão de produto
  const confirmarExclusao = (produto: Produto) => {
    setProdutoParaExcluir(produto)
    setDeleteDialogOpen(true)
  }

  // Função para excluir produto
  const excluirProduto = async () => {
    if (!produtoParaExcluir) return

    try {
      console.log(`Excluindo produto ID: ${produtoParaExcluir.id}`)
      await produtoService.excluirProduto(produtoParaExcluir.id)

      toast({
        title: "Sucesso",
        description: `Produto "${produtoParaExcluir.nome}" excluído com sucesso.`,
      })

      // Atualizar a lista de produtos
      carregarProdutos()
    } catch (error: any) {
      console.error("Erro ao excluir produto:", error)

      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o produto.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setProdutoParaExcluir(null)
    }
  }

  // Carregar produtos ao montar o componente
  useEffect(() => {
    carregarProdutos()
  }, [])

  // Se o usuário não tem permissão para visualizar o estoque, mostrar mensagem
  if (!canViewInventory) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Estoque</h2>
        </div>

        <div className="flex justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Você não tem permissão para visualizar o estoque.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        <h2 className="text-3xl font-bold tracking-tight">Estoque</h2>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={carregarProdutos} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>

        <PermissionGuard permission={Permission.ADD_INVENTORY} permissions={["ESTOQUE_ADICIONAR"]}>
          <Button onClick={() => router.push("/estoque/adicionar")}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </PermissionGuard>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Categoria</th>
              <th className="p-2 text-left">Quantidade</th>
              <th className="p-2 text-left">Preço</th>
              <th className="p-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <RefreshCw className="mx-auto h-6 w-6 animate-spin text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">Carregando produtos...</p>
                </td>
              </tr>
            ) : produtos.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">Nenhum produto encontrado.</p>
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id} className="border-b">
                  <td className="p-2">{produto.codigo}</td>
                  <td className="p-2">{produto.nome}</td>
                  <td className="p-2">{produto.categoria || "-"}</td>
                  <td className="p-2">{produto.quantidade}</td>
                  <td className="p-2">R$ {produto.preco.toFixed(2).replace(".", ",")}</td>
                  <td className="p-2 text-right">
                    <div className="flex justify-end gap-2">
                      <PermissionGuard permission={Permission.EDIT_INVENTORY} permissions={["ESTOQUE_EDITAR"]}>
                        <Button variant="ghost" size="icon" onClick={() => router.push(`/estoque/${produto.id}`)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      </PermissionGuard>

                      <PermissionGuard permission={Permission.DELETE_INVENTORY} permissions={["ESTOQUE_REMOVER"]}>
                        <Button variant="ghost" size="icon" onClick={() => confirmarExclusao(produto)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </PermissionGuard>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{produtoParaExcluir?.nome}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={excluirProduto} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
