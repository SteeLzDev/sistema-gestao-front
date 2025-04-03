"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"
import { filaService } from "@/services/filaService"
import { UserPlus, Clock, AlertTriangle, ArrowLeft } from 'lucide-react'
import { useRouter } from "next/navigation"
import type { Cliente, Atendimento } from "@/types/fila"

export default function FilaPage() {
  const router = useRouter()
  const [clientesNaFila, setClientesNaFila] = useState<Cliente[]>([])
  const [clientesEmAtendimento, setClientesEmAtendimento] = useState<Atendimento[]>([])
  const [loading, setLoading] = useState(true)
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    servico: "",
    prioridade: "normal" as "normal" | "alta",
    telefone: "",
  })
  const { toast } = useToast()

  const carregarFila = async () => {
    try {
      setLoading(true)
      const [fila, atendimento] = await Promise.all([
        filaService.getClientesNaFila(),
        filaService.getClientesEmAtendimento(),
      ])
      setClientesNaFila(fila)
      setClientesEmAtendimento(atendimento)
    } catch (error) {
      console.error("Erro ao carregar fila:", error)
      toast({
        title: "Erro ao carregar fila",
        description: "Não foi possível carregar os dados da fila.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarFila()
    // Atualizar a fila a cada 30 segundos
    const interval = setInterval(carregarFila, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNovoCliente((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setNovoCliente((prev) => ({ ...prev, [name]: value }))
  }

  const adicionarCliente = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!novoCliente.nome || !novoCliente.servico) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome do cliente e o serviço.",
        variant: "destructive",
      })
      return
    }

    try {
      await filaService.adicionarClienteNaFila(novoCliente)
      toast({
        title: "Cliente adicionado",
        description: "Cliente adicionado à fila com sucesso.",
      })
      setNovoCliente({
        nome: "",
        servico: "",
        prioridade: "normal",
        telefone: "",
      })
      carregarFila()
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error)
      toast({
        title: "Erro ao adicionar cliente",
        description: "Não foi possível adicionar o cliente à fila.",
        variant: "destructive",
      })
    }
  }

  const atenderCliente = async (id: number) => {
    try {
      // Usar o nome do atendente padrão ou obter de algum lugar
      const atendente = "Atendente"
      await filaService.iniciarAtendimento(id, atendente)
      toast({
        title: "Cliente em atendimento",
        description: "O cliente foi movido para atendimento.",
      })
      carregarFila()
    } catch (error) {
      console.error("Erro ao atender cliente:", error)
      toast({
        title: "Erro ao atender cliente",
        description: "Não foi possível atender o cliente.",
        variant: "destructive",
      })
    }
  }

  const finalizarAtendimento = async (id: number) => {
    try {
      await filaService.finalizarAtendimento(id)
      toast({
        title: "Atendimento finalizado",
        description: "O atendimento foi finalizado com sucesso.",
      })
      carregarFila()
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error)
      toast({
        title: "Erro ao finalizar atendimento",
        description: "Não foi possível finalizar o atendimento.",
        variant: "destructive",
      })
    }
  }

  const removerDaFila = async (id: number) => {
    try {
      await filaService.removerClienteDaFila(id)
      toast({
        title: "Cliente removido",
        description: "Cliente removido da fila com sucesso.",
      })
      carregarFila()
    } catch (error) {
      console.error("Erro ao remover cliente:", error)
      toast({
        title: "Erro ao remover cliente",
        description: "Não foi possível remover o cliente da fila.",
        variant: "destructive",
      })
    }
  }

  const formatarTempoEspera = (dataChegada: string) => {
    try {
      return formatDistanceToNow(new Date(dataChegada), {
        locale: ptBR,
        addSuffix: false,
      })
    } catch (error) {
      return "Tempo inválido"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/dashboard")} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Dashboard</span>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Fila de Atendimento</h2>
        </div>
        <Button onClick={carregarFila} variant="outline">
          Atualizar Fila
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Cliente à Fila</CardTitle>
            <CardDescription>Preencha os dados do cliente para adicionar à fila de atendimento</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={adicionarCliente} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Cliente</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={novoCliente.nome}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servico">Serviço</Label>
                <Input
                  id="servico"
                  name="servico"
                  value={novoCliente.servico}
                  onChange={handleInputChange}
                  placeholder="Tipo de serviço"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone (opcional)</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={novoCliente.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  value={novoCliente.prioridade}
                  onValueChange={(value) => handleSelectChange(value, "prioridade")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar à Fila
              </Button>
            </form>
          </CardContent>
        </Card>

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

            {clientesNaFila.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium">Próximos Atendimentos</h3>
                <div className="space-y-2">
                  {clientesNaFila
                    .sort((a, b) => {
                      // Ordenar por prioridade (alta primeiro) e depois por tempo de chegada
                      if (a.prioridade === "alta" && b.prioridade !== "alta") return -1
                      if (a.prioridade !== "alta" && b.prioridade === "alta") return 1
                      return new Date(a.chegada).getTime() - new Date(b.chegada).getTime()
                    })
                    .slice(0, 3)
                    .map((cliente) => (
                      <div key={cliente.id} className="flex items-center justify-between rounded-md border p-2">
                        <div>
                          <div className="font-medium">{cliente.nome}</div>
                          <div className="text-sm text-muted-foreground">{cliente.servico}</div>
                        </div>
                        <div className="flex items-center">
                          {cliente.prioridade === "alta" && (
                            <Badge variant="outline" className="mr-2 border-amber-500 text-amber-500">
                              Prioritário
                            </Badge>
                          )}
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {cliente.espera || formatarTempoEspera(cliente.chegada)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {clientesNaFila.some((c) => {
              const tempoEspera = new Date().getTime() - new Date(c.chegada).getTime()
              return tempoEspera > 30 * 60 * 1000 // 30 minutos
            }) && (
              <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <span className="font-medium">Atenção</span>
                </div>
                <p className="text-sm">Há clientes aguardando há mais de 30 minutos na fila.</p>
              </div>
            )}
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
              <div className="flex justify-center p-4">Carregando fila...</div>
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
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesNaFila.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.servico}</TableCell>
                      <TableCell>{format(new Date(cliente.chegada), "HH:mm")}</TableCell>
                      <TableCell>{cliente.espera || formatarTempoEspera(cliente.chegada)}</TableCell>
                      <TableCell>
                        {cliente.prioridade === "alta" ? (
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            Alta
                          </Badge>
                        ) : (
                          <Badge variant="outline">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" onClick={() => atenderCliente(cliente.id)}>
                            Atender
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => removerDaFila(cliente.id)}>
                            Remover
                          </Button>
                        </div>
                      </TableCell>
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
              <div className="flex justify-center p-4">Carregando...</div>
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
                    <TableHead className="text-right">Ações</TableHead>
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
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => finalizarAtendimento(atendimento.id)}>
                          Finalizar
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
    </div>
  )
}