"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendaService } from "@/services/vendaService"
import { Header } from "@/components/header-no-theme"
import Link from "next/link"
import { formatarData, formatarMoeda } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2, Info } from "lucide-react"
import { BackButton } from "@/components/ui/BackButton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { useToast } from "@/components/ui/use-toast"

export default function VendasPage() {
  const router = useRouter()
  const { user, hasPermission, isAuthenticated, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [vendas, setVendas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usandoDadosExemplo, setUsandoDadosExemplo] = useState(false)

  // Verificar se o usuário tem permissão para visualizar vendas
  // Não use esta variável como dependência do useEffect
  const canViewSales =
    hasPermission(Permission.VIEW_SALES) || hasPermission("VENDAS_VISUALIZAR") || hasPermission("VENDA_VISUALIZAR")

  // Função para carregar vendas
  const carregarVendas = async () => {
    if (!isAuthenticated || authLoading) {
      return
    }

    if (!canViewSales) {
      setLoading(false)
      setError("Você não tem permissão para visualizar vendas.")
      return
    }

    setLoading(true)
    setError(null)
    setUsandoDadosExemplo(false)

    try {
      console.log("Carregando vendas...")
      console.log("Permissões do usuário:", user?.permissoes)

      // Carregar vendas diretamente sem adicionar permissões ou atualizar auth
      const data = await vendaService.listarVendas()
      setVendas(data)

      // Verificar se estamos usando dados de exemplo
      if (data.length === 2 && data[0].cliente === "Cliente Exemplo 1") {
        setUsandoDadosExemplo(true)
        console.log("Usando dados de exemplo")
      }
    } catch (err: any) {
      console.error("Erro ao carregar vendas:", err)

      let mensagemErro = "Erro ao carregar vendas. "

      if (err.response) {
        if (err.response.status === 401) {
          mensagemErro += "Sua sessão expirou. Por favor, faça login novamente."
          toast({
            title: "Erro de autenticação",
            description: "Sua sessão expirou. Por favor, faça login novamente.",
            variant: "destructive",
          })
          // Não redirecionamos automaticamente para evitar loops
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

  // Efeito para carregar vendas apenas uma vez quando a página carrega
  // e o usuário está autenticado
  useEffect(() => {
    // Verificar se o usuário está autenticado e não está carregando
    if (isAuthenticated && !authLoading) {
      carregarVendas()
    }

    // Se não estiver autenticado e não estiver carregando, redirecionar para login
    if (!isAuthenticated && !authLoading) {
      router.push("/login")
    }

    // Dependências reduzidas para evitar loops
  }, [isAuthenticated, authLoading, router])

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

  // Se o usuário não tem permissão para visualizar vendas, mostrar mensagem
  if (!canViewSales) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold">Gerenciamento de Vendas</h1>
            </div>

            <div className="flex justify-center py-8">
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Você não tem permissão para visualizar vendas.</AlertDescription>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold">Gerenciamento de Vendas</h1>
            </div>
            <div className="space-x-2">
              <Button onClick={carregarVendas} variant="outline" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Info className="mr-2 h-4 w-4" />}
                Atualizar
              </Button>
              <Button asChild>
                <Link href="/vendas/simples">Nova Venda</Link>
              </Button>
            </div>
          </div>

          {usandoDadosExemplo && (
            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Exibindo dados de demonstração. O sistema não conseguiu acessar os dados reais devido a restrições de
                permissão.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Carregando vendas...</p>
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : vendas.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhuma venda registrada.</p>
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
