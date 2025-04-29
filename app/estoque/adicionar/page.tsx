"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, Loader2 } from "lucide-react"
import apiClient from "@/services/apiClient"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/ui/BackButton"

// Interface para o produto
interface ProdutoForm {
  codigo: string
  nome: string
  quantidade: number
  preco: number
  categoria: string
}

export default function AdicionarProdutoPage() {
  const router = useRouter()
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const [produto, setProduto] = useState<ProdutoForm>({
    codigo: "",
    nome: "",
    quantidade: 0,
    preco: 0,
    categoria: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar permissão
  const canAddProduct = hasPermission(Permission.ADD_INVENTORY) || hasPermission("ESTOQUE_ADICIONAR")

  // Se não tiver permissão, redirecionar para página de acesso negado
  if (!canAddProduct) {
    router.push("/acesso-negado")
    return null
  }

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Converter para número quando necessário
    if (name === "quantidade" || name === "preco") {
      setProduto((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }))
    } else {
      setProduto((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Função para salvar o produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!produto.codigo || !produto.nome || produto.quantidade < 0 || produto.preco <= 0) {
      setError("Por favor, preencha todos os campos corretamente.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Enviar para a API
      await apiClient.post("/produtos", produto)

      // Mostrar mensagem de sucesso
      toast({
        title: "Produto adicionado",
        description: `O produto ${produto.nome} foi adicionado com sucesso.`,
      })

      // Redirecionar para a lista de produtos
      router.push("/estoque")
    } catch (error: any) {
      console.error("Erro ao adicionar produto:", error)

      // Mensagem de erro
      let mensagemErro = "Não foi possível adicionar o produto. "

      if (error.response) {
        mensagemErro += `Erro ${error.response.status}: ${error.response.data?.message || error.response.statusText}`
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <BackButton to="/estoque" label="Voltar para Estoque" />
        <h2 className="text-3xl font-bold tracking-tight">Adicionar Produto</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Produto</CardTitle>
          <CardDescription>Preencha os dados do novo produto para adicionar ao estoque.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Mensagem de erro */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input
                  id="codigo"
                  name="codigo"
                  value={produto.codigo}
                  onChange={handleChange}
                  placeholder="Ex: PROD001"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  name="categoria"
                  value={produto.categoria}
                  onChange={handleChange}
                  placeholder="Ex: Eletrônicos"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Produto</Label>
              <Input
                id="nome"
                name="nome"
                value={produto.nome}
                onChange={handleChange}
                placeholder="Ex: Smartphone XYZ"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  name="quantidade"
                  type="number"
                  min="0"
                  value={produto.quantidade}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco">Preço (R$)</Label>
                <Input
                  id="preco"
                  name="preco"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={produto.preco}
                  onChange={handleChange}
                  placeholder="Ex: 1299.99"
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Produto
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
