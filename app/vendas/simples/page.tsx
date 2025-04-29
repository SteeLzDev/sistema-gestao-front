"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { produtoService } from "@/services/produtoService"
import { Header } from "@/components/header-no-theme"
import { useRouter } from "next/navigation"
import { formatarMoeda } from "@/lib/utils"
import { vendaService } from "@/services/vendaService"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/ui/BackButton"

// Tipos simplificados
interface Produto {
  id: number
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

export default function VendaSimples() {
  const router = useRouter()
  const { user, hasPermission, isAuthenticated, loading: authLoading } = useAuth()
  const { toast } = useToast()

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([])
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<string>("")
  const [quantidade, setQuantidade] = useState(1)
  const [cliente, setCliente] = useState("")
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar se o usuário tem permissão para criar vendas
  const canCreateSale =
    hasPermission(Permission.CREATE_SALE) || hasPermission("VENDAS_CRIAR") || hasPermission("VENDA_CRIAR")

  // Função para carregar produtos
  const carregarProdutos = async () => {
    if (!isAuthenticated || authLoading) {
      return
    }

    if (!canCreateSale) {
      setLoading(false)
      setError("Você não tem permissão para criar vendas.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Carregando produtos...")
      console.log("Permissões do usuário:", user?.permissoes)

      // Verificar se há token no localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token não encontrado no localStorage")
        setError("Você precisa estar autenticado para acessar este recurso.")
        return
      }

      console.log("Token encontrado:", token.substring(0, 10) + "...")

      // Carregar produtos diretamente
      const data = await produtoService.listarProdutos()
      setProdutos(data)
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err)

      let mensagemErro = "Erro ao carregar produtos. "

      if (err.response) {
        if (err.response.status === 401) {
          mensagemErro += "Sua sessão expirou. Por favor, faça login novamente."
        } else if (err.response.status === 403) {
          mensagemErro += "Você não tem permissão para acessar este recurso."
        } else {
          mensagemErro += err.response.data?.message || err.message || "Tente novamente."
        }
      } else {
        mensagemErro += err.message || "Tente novamente."
      }

      setError(mensagemErro)
    } finally {
      setLoading(false)
    }
  }

  // Efeito para carregar produtos apenas uma vez quando a página carrega
  // e o usuário está autenticado
  useEffect(() => {
    // Verificar se o usuário está autenticado e não está carregando
    if (isAuthenticated && !authLoading) {
      carregarProdutos()
    }

    // Se não estiver autenticado e não estiver carregando, redirecionar para login
    if (!isAuthenticated && !authLoading) {
      router.push("/login")
    }

    // Dependências reduzidas para evitar loops
  }, [isAuthenticated, authLoading, router])

  const handleProdutoChange = (produtoId: string) => {
    setProdutoSelecionadoId(produtoId)
    setQuantidade(1)
  }

  const handleAdicionarItem = () => {
    if (!produtoSelecionadoId) {
      toast({
        title: "Erro ao adicionar item",
        description: "Selecione um produto",
        variant: "destructive",
      })
      return
    }

    const produtoSelecionado = produtos.find((p) => p.id.toString() === produtoSelecionadoId)

    if (!produtoSelecionado) {
      toast({
        title: "Erro ao adicionar item",
        description: "Produto não encontrado",
        variant: "destructive",
      })
      return
    }

    if (quantidade <= 0) {
      toast({
        title: "Erro ao adicionar item",
        description: "A quantidade deve ser maior que zero",
        variant: "destructive",
      })
      return
    }

    if (quantidade > produtoSelecionado.quantidade) {
      toast({
        title: "Quantidade indisponível",
        description: `Apenas ${produtoSelecionado.quantidade} unidades disponíveis em estoque.`,
        variant: "destructive",
      })
      return
    }

    const itemExistente = itensVenda.find((item) => item.produtoId === produtoSelecionado.id)

    if (itemExistente) {
      // Atualizar quantidade do item existente
      const novosItens = itensVenda.map((item) => {
        if (item.produtoId === produtoSelecionado.id) {
          const novaQuantidade = item.quantidade + quantidade
          if (novaQuantidade > produtoSelecionado.quantidade) {
            toast({
              title: "Quantidade indisponível",
              description: `Quantidade total excede o estoque disponível`,
              variant: "destructive",
            })
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

      setItensVenda(novosItens)
      setProdutoSelecionadoId("")
      setQuantidade(1)
    } else {
      // Adicionar novo item
      const novoItem: ItemVenda = {
        produtoId: produtoSelecionado.id,
        produtoNome: produtoSelecionado.nome,
        quantidade,
        precoUnitario: produtoSelecionado.preco,
        subtotal: produtoSelecionado.preco * quantidade,
      }

      setItensVenda([...itensVenda, novoItem])
      setProdutoSelecionadoId("")
      setQuantidade(1)
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
      toast({
        title: "Carrinho vazio",
        description: "Adicione pelo menos um item à venda",
        variant: "destructive",
      })
      return
    }

    if (!cliente.trim()) {
      toast({
        title: "Nome do cliente obrigatório",
        description: "Informe o nome do cliente para finalizar a venda",
        variant: "destructive",
      })
      return
    }

    setSalvando(true)
    setError(null)

    try {
      // Verificar se há token antes de fazer a requisição
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Você precisa estar autenticado para registrar uma venda.")
        return
      }

      // Criar objeto de venda
      const venda = {
        cliente,
        itens: itensVenda,
      }

      // Log para depuração
      console.log("Venda a ser enviada:", JSON.stringify(venda, null, 2))

      // Enviar para o serviço de vendas
      const response = await vendaService.registrarVenda(venda)
      console.log("Resposta do servidor:", response)

      toast({
        title: "Venda registrada com sucesso!",
        description: `Venda para ${cliente} no valor de ${formatarMoeda(calcularTotal())}`,
      })

      // Redirecionar para a lista de vendas
      router.push("/vendas")
    } catch (err: any) {
      console.error("Erro ao registrar venda:", err)

      let mensagemErro = "Erro ao registrar venda. "

      if (err.response) {
        if (err.response.status === 401) {
          mensagemErro += "Sua sessão expirou. Por favor, faça login novamente."
        } else if (err.response.status === 403) {
          mensagemErro += "Você não tem permissão para acessar este recurso."
        } else {
          mensagemErro += err.response.data?.message || err.message || "Tente novamente."
        }
      } else {
        mensagemErro += err.message || "Tente novamente."
      }

      setError(mensagemErro)

      toast({
        title: "Erro ao registrar venda",
        description: mensagemErro,
        variant: "destructive",
      })
    } finally {
      setSalvando(false)
    }
  }

  // Se a autenticação ainda estiver carregando, mostre um loader
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 space-y-6">
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Verificando autenticação...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Se não estiver autenticado, não renderize nada (o redirecionamento acontecerá no useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Se o usuário não tem permissão para criar vendas, mostrar mensagem
  if (!canCreateSale) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold">Nova Venda</h1>
            </div>

            <div className="flex justify-center py-8">
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Você não tem permissão para criar vendas.</AlertDescription>
              </Alert>
            </div>
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
          <h1 className="text-2xl font-bold">Nova Venda (Versão Simplificada)</h1>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Carregando produtos...</p>
            </div>
          ) : (
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
                              <TableCell>{item.produtoNome}</TableCell>
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
                <Button type="submit" disabled={salvando || itensVenda.length === 0}>
                  {salvando ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Finalizar Venda"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
