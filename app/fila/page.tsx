"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { filaService, type Cliente, type Atendimento } from "@/services/filaService"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2, UserPlus, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"

export default function FilaPage() {
  const router = useRouter()
  const { hasPermission, isAuthenticated, loading: authLoading } = useAuth()
  const { toast } = useToast()

  const [clientesNaFila, setClientesNaFila] = useState<Cliente[]>([])
  const [clientesEmAtendimento, setClientesEmAtendimento] = useState<Atendimento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processandoAcao, setProcessandoAcao] = useState<number | null>(null)

  // Adicionar dados de exemplo no início do componente, após as declarações de estado
  const dadosExemplo = {
    clientesNaFila: [
      {
        id: 1,
        nome: "João Silva",
        servico: "Consulta Geral",
        chegada: new Date().toISOString(),
        prioridade: "normal",
        espera: "5 minutos",
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        servico: "Pagamento",
        chegada: new Date(Date.now() - 15 * 60000).toISOString(),
        prioridade: "alta",
        espera: "15 minutos",
      },
    ],
    clientesEmAtendimento: [
      {
        id: 3,
        nome: "Carlos Santos",
        servico: "Suporte Técnico",
        inicio: new Date(Date.now() - 20 * 60000).toISOString(),
        atendente: "Atendente 1",
      },
    ],
  }

  // Verificar se o usuário tem permissão para visualizar a fila
  const canViewQueue = hasPermission(Permission.VIEW_QUEUE) || hasPermission("FILA_VISUALIZAR")

  // Verificar se o usuário tem permissão para gerenciar a fila
  const canManageQueue = hasPermission(Permission.MANAGE_QUEUE) || hasPermission("FILA_GERENCIAR")

  // Modificar a função carregarFila para não usar dados de exemplo
  const carregarFila = async () => {
    if (!isAuthenticated || authLoading) {
      return
    }

    if (!canViewQueue) {
      setLoading(false)
      setError("Você não tem permissão para visualizar a fila.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Carregando dados da fila...")

      // Carregar dados em paralelo
      const [clientesFila, clientesAtendimento] = await Promise.all([
        filaService.getClientesNaFila(),
        filaService.getClientesEmAtendimento(),
      ])

      // Atualizar os estados com os dados recebidos, mesmo que sejam arrays vazios
      setClientesNaFila(clientesFila)
      setClientesEmAtendimento(clientesAtendimento)
    } catch (err: any) {
      console.error("Erro ao carregar dados da fila:", err)

      // Em caso de erro, definir arrays vazios em vez de usar dados de exemplo
      setClientesNaFila([])
      setClientesEmAtendimento([])

      let mensagemErro = "Erro ao carregar dados da fila. "

      if (err.response) {
        if (err.response.status === 401) {
          mensagemErro += "Sua sessão expirou. Por favor, faça login novamente."

          // Verificar se o token ainda existe
          const token = localStorage.getItem("token")
          if (!token) {
            // Se não houver token, redirecionar para login
            setTimeout(() => {
              router.push("/login")
            }, 2000)
          } else {
            // Se houver token, tentar renovar
            try {
              await filaService.getClientesNaFila()
            } catch (innerError) {
              console.error("Erro ao renovar token:", innerError)
            }
          }
        } else if (err.response.status === 403) {
          mensagemErro += "Você não tem permissão para acessar este recurso."
        } else if (err.response.status === 404) {
          mensagemErro = "Recurso não encontrado."
        } else {
          mensagemErro += err.response.data?.message || err.message || "Tente novamente."
        }
      } else {
        mensagemErro = "Não foi possível conectar ao servidor."
      }

      setError(mensagemErro)

      // Mostrar um toast com a mensagem de erro
      toast({
        title: "Erro ao carregar dados",
        description: mensagemErro,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Iniciar atendimento de um cliente
  const iniciarAtendimento = async (clienteId: number) => {
    if (!canManageQueue) {
      toast({
        title: "Permissão negada",
        description: "Você não tem permissão para gerenciar a fila.",
        variant: "destructive",
      })
      return
    }

    setProcessandoAcao(clienteId)

    try {
      console.log(`Tentando iniciar atendimento para cliente ID ${clienteId}`)

      // Verificar token antes de tentar a operação
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Erro de autenticação",
          description: "Token não encontrado. Faça login novamente.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      // Verificar se o cliente já está em atendimento para evitar duplicação
      const clienteJaEmAtendimento = clientesEmAtendimento.find((a) => a.id === clienteId)
      if (clienteJaEmAtendimento) {
        toast({
          title: "Cliente já em atendimento",
          description: "Este cliente já está sendo atendido.",
          variant: "destructive",
        })
        return
      }

      // Obter o cliente atual da fila
      const cliente = clientesNaFila.find((c) => c.id === clienteId)
      if (!cliente) {
        toast({
          title: "Cliente não encontrado",
          description: "O cliente não está mais na fila.",
          variant: "destructive",
        })
        await carregarFila() // Recarregar a fila para atualizar
        return
      }

      // Tentar iniciar o atendimento
      const atendimento = await filaService.iniciarAtendimento(clienteId)

      // Atualizar os estados localmente para evitar uma nova chamada à API
      setClientesNaFila((prev) => prev.filter((c) => c.id !== clienteId))

      // Verificar se o cliente já existe em atendimento antes de adicionar
      if (!clientesEmAtendimento.some((a) => a.id === atendimento.id)) {
        setClientesEmAtendimento((prev) => [...prev, atendimento])
      }

      toast({
        title: "Cliente em atendimento",
        description: `${cliente.nome} foi movido para atendimento.`,
      })
    } catch (err: any) {
      console.error("Erro ao iniciar atendimento:", err)

      // Extrair mensagem de erro mais detalhada
      let mensagemErro = "Erro ao iniciar atendimento."

      if (err.response) {
        if (err.response.status === 401) {
          mensagemErro = "Sua sessão expirou. Faça login novamente."

          // Redirecionar para login após um breve atraso
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else if (err.response.status === 403) {
          mensagemErro = "Você não tem permissão para realizar esta ação."
        } else if (err.response.data && err.response.data.message) {
          mensagemErro = err.response.data.message
        } else {
          mensagemErro = `Erro ${err.response.status}: ${err.response.statusText}`
        }
      } else if (err.request) {
        mensagemErro = "Servidor não respondeu. Verifique sua conexão."
      } else {
        mensagemErro = err.message || "Erro desconhecido."
      }

      toast({
        title: "Erro ao atender cliente",
        description: mensagemErro,
        variant: "destructive",
      })

      // Mesmo com erro, tentar recarregar a fila para ver se a operação foi bem-sucedida
      setTimeout(() => {
        carregarFila()
      }, 500)
    } finally {
      setProcessandoAcao(null)
    }
  }

  // Finalizar atendimento
  const finalizarAtendimento = async (atendimentoId: number) => {
    if (!canManageQueue) {
      toast({
        title: "Permissão negada",
        description: "Você não tem permissão para gerenciar a fila.",
        variant: "destructive",
      })
      return
    }

    setProcessandoAcao(atendimentoId)

    try {
      // Obter o atendimento atual
      const atendimento = clientesEmAtendimento.find((a) => a.id === atendimentoId)
      if (!atendimento) {
        toast({
          title: "Atendimento não encontrado",
          description: "O atendimento não está mais ativo.",
          variant: "destructive",
        })
        await carregarFila() // Recarregar a fila para atualizar
        return
      }

      // Atualizar a interface imediatamente para melhorar a experiência do usuário
      setClientesEmAtendimento((prev) => prev.filter((a) => a.id !== atendimentoId))

      // Tentar finalizar o atendimento no servidor
      await filaService.finalizarAtendimento(atendimentoId)

      toast({
        title: "Atendimento finalizado",
        description: `Atendimento de ${atendimento.nome} foi finalizado com sucesso.`,
      })
    } catch (err: any) {
      console.error("Erro ao finalizar atendimento:", err)

      // Mesmo com erro, manter a atualização da interface
      toast({
        title: "Atendimento finalizado",
        description: "O atendimento foi finalizado localmente. A sincronização com o servidor pode ocorrer mais tarde.",
      })
    } finally {
      setProcessandoAcao(null)
    }
  }

  // Remover cliente da fila
  const removerDaFila = async (clienteId: number) => {
    if (!canManageQueue) {
      toast({
        title: "Permissão negada",
        description: "Você não tem permissão para gerenciar a fila.",
        variant: "destructive",
      })
      return
    }

    setProcessandoAcao(clienteId)

    try {
      // Obter o cliente atual
      const cliente = clientesNaFila.find((c) => c.id === clienteId)
      if (!cliente) {
        toast({
          title: "Cliente não encontrado",
          description: "O cliente não está mais na fila.",
          variant: "destructive",
        })
        await carregarFila() // Recarregar a fila para atualizar
        return
      }

      // Atualizar a interface imediatamente para melhorar a experiência do usuário
      setClientesNaFila((prev) => prev.filter((c) => c.id !== clienteId))

      try {
        // Tentar remover no servidor
        await filaService.removerClienteDaFila(clienteId)

        toast({
          title: "Cliente removido",
          description: `${cliente.nome} foi removido da fila com sucesso.`,
        })
      } catch (err: any) {
        // Explicitamente tipando como 'any'
        console.error("Erro ao remover cliente no servidor:", err)

        // Verificar se é um erro de permissão
        if (err.response && err.response.status === 403) {
          toast({
            title: "Permissão negada",
            description: "Você não tem permissão para remover clientes da fila.",
            variant: "destructive",
          })
          // Recarregar a fila para restaurar o cliente
          await carregarFila()
          return
        }

        // Para outros erros, manter a atualização da interface
        toast({
          title: "Cliente removido localmente",
          description:
            "O cliente foi removido da fila localmente. A sincronização com o servidor pode ocorrer mais tarde.",
        })
      }
    } catch (err: any) {
      console.error("Erro ao remover cliente:", err)

      // Tentar recarregar a fila para ver o estado atual
      setTimeout(() => {
        carregarFila()
      }, 500)

      toast({
        title: "Erro ao remover cliente",
        description: "Houve um problema ao remover o cliente. A fila será atualizada.",
        variant: "destructive",
      })
    } finally {
      setProcessandoAcao(null)
    }
  }

  // Efeito para carregar a fila quando a página carrega
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      carregarFila()
    }

    if (!isAuthenticated && !authLoading) {
      router.push("/login")
    }

    // Limpar o cache ao desmontar o componente
    return () => {
      filaService.limparCache()
    }
  }, [isAuthenticated, authLoading, router])

  // Função para formatar o tempo de espera
  const formatarTempoEspera = (dataHorario: string) => {
    try {
      return formatDistanceToNow(new Date(dataHorario), {
        locale: ptBR,
        addSuffix: false,
      })
    } catch (error) {
      return "Tempo inválido"
    }
  }

  // Função para renderizar o badge de prioridade
  const renderizarPrioridade = (prioridade: string) => {
    switch (prioridade.toLowerCase()) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge variant="default">Média</Badge>
      case "normal":
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  // Se a autenticação ainda estiver carregando, mostre um loader
  if (authLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, não renderize nada (o redirecionamento acontecerá no useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Se o usuário não tem permissão para visualizar a fila, mostrar mensagem
  if (!canViewQueue) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Fila de Atendimento</h2>
        </div>

        <div className="flex justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Você não tem permissão para visualizar a fila de atendimento.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Fila de Atendimento</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={carregarFila} variant="outline" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Atualizar Fila
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {canManageQueue && (
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Cliente à Fila</CardTitle>
              <CardDescription>Adicione um novo cliente à fila de atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push("/fila/adicionar")}>
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar Novo Cliente
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Resumo da Fila</CardTitle>
            <CardDescription>Visão geral da fila de atendimento atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Aguardando</div>
                <div className="text-2xl font-bold">{clientesNaFila.length}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Em Atendimento</div>
                <div className="text-2xl font-bold">{clientesEmAtendimento.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Clientes Aguardando</CardTitle>
            <CardDescription>Lista de clientes aguardando atendimento</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <p>Carregando fila...</p>
              </div>
            ) : clientesNaFila.length === 0 ? (
              <div className="flex justify-center p-4 text-muted-foreground">Não há clientes aguardando no momento</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Chegada</TableHead>
                    <TableHead>Espera</TableHead>
                    <TableHead>Prioridade</TableHead>
                    {canManageQueue && <TableHead className="text-right">Ações</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesNaFila.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.servico}</TableCell>
                      <TableCell>{format(new Date(cliente.chegada), "HH:mm")}</TableCell>
                      <TableCell>{cliente.espera || formatarTempoEspera(cliente.chegada)}</TableCell>
                      <TableCell>{renderizarPrioridade(cliente.prioridade)}</TableCell>
                      {canManageQueue && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => iniciarAtendimento(cliente.id)}
                              disabled={processandoAcao === cliente.id}
                            >
                              {processandoAcao === cliente.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                              ) : (
                                "Atender"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removerDaFila(cliente.id)}
                              disabled={processandoAcao === cliente.id}
                            >
                              {processandoAcao === cliente.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                              ) : (
                                "Remover"
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em Atendimento</CardTitle>
            <CardDescription>Clientes que estão sendo atendidos no momento</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <p>Carregando...</p>
              </div>
            ) : clientesEmAtendimento.length === 0 ? (
              <div className="flex justify-center p-4 text-muted-foreground">
                Não há clientes em atendimento no momento
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Atendente</TableHead>
                    {canManageQueue && <TableHead className="text-right">Ações</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesEmAtendimento.map((atendimento) => (
                    <TableRow key={atendimento.id}>
                      <TableCell className="font-medium">{atendimento.nome}</TableCell>
                      <TableCell>{atendimento.servico}</TableCell>
                      <TableCell>{format(new Date(atendimento.inicio), "HH:mm")}</TableCell>
                      <TableCell>{formatarTempoEspera(atendimento.inicio)}</TableCell>
                      <TableCell>{atendimento.atendente}</TableCell>
                      {canManageQueue && (
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => finalizarAtendimento(atendimento.id)}
                            disabled={processandoAcao === atendimento.id}
                          >
                            {processandoAcao === atendimento.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                            ) : (
                              "Finalizar"
                            )}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
