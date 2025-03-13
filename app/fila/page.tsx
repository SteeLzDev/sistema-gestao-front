"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface Cliente {
  id: number
  nome: string
  servico: string
  chegada: string
  espera: string
  prioridade: string
}

interface Atendimento {
  id: number
  nome: string
  servico: string
  inicio: string
  atendente: string
  status: string
}

export default function FilaPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    prioridade: "normal",
    observacoes: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setLoading(true)
      setError(null)

      // Aqui você chamaria o serviço para carregar os dados
      // const data = await filaService.listarClientes()

      // Simulando o carregamento de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dados de exemplo
      const clientesExemplo = [
        {
          id: 1,
          nome: "Pedro Alves",
          servico: "Troca de Óleo",
          chegada: "09:15",
          espera: "25 min",
          prioridade: "Normal",
        },
        {
          id: 2,
          nome: "Juliana Costa",
          servico: "Revisão Geral",
          chegada: "09:30",
          espera: "10 min",
          prioridade: "Urgente",
        },
        {
          id: 3,
          nome: "Marcos Souza",
          servico: "Troca de Pneus",
          chegada: "09:45",
          espera: "5 min",
          prioridade: "Normal",
        },
      ]

      const atendimentosExemplo = [
        {
          id: 1,
          nome: "Maria Oliveira",
          servico: "Troca de Bateria",
          inicio: "09:00",
          atendente: "Roberto Santos",
          status: "Em andamento",
        },
        {
          id: 2,
          nome: "José Silva",
          servico: "Alinhamento",
          inicio: "09:10",
          atendente: "Carlos Pereira",
          status: "Finalizando",
        },
      ]

      setClientes(clientesExemplo)
      setAtendimentos(atendimentosExemplo)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      setError("Não foi possível carregar os dados da fila. Verifique se o servidor está rodando.")
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados da fila.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCliente = async () => {
    try {
      // Aqui você chamaria o serviço para adicionar o cliente
      // await filaService.adicionarCliente(formData)

      // Simulando a adição do cliente
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Sucesso",
        description: "Cliente adicionado à fila com sucesso.",
      })

      setFormDialogOpen(false)
      setFormData({
        nome: "",
        telefone: "",
        servico: "",
        prioridade: "normal",
        observacoes: "",
      })

      carregarDados()
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o cliente à fila.",
        variant: "destructive",
      })
    }
  }

  const handleAtenderCliente = async (cliente: Cliente) => {
    try {
      // Aqui você chamaria o serviço para atender o cliente
      // await filaService.atenderCliente(cliente.id)

      // Simulando o atendimento
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Sucesso",
        description: `Cliente ${cliente.nome} está sendo atendido.`,
      })

      carregarDados()
    } catch (error) {
      console.error("Erro ao atender cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o atendimento.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveClick = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setRemoveDialogOpen(true)
  }

  const handleRemoveConfirm = async () => {
    if (!selectedCliente) return

    try {
      // Aqui você chamaria o serviço para remover o cliente
      // await filaService.removerCliente(selectedCliente.id)

      // Simulando a remoção
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Sucesso",
        description: "Cliente removido da fila com sucesso.",
      })

      carregarDados()
    } catch (error) {
      console.error("Erro ao remover cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o cliente da fila.",
        variant: "destructive",
      })
    } finally {
      setRemoveDialogOpen(false)
    }
  }

  const handleFinalizarAtendimento = async (atendimento: Atendimento) => {
    try {
      // Aqui você chamaria o serviço para finalizar o atendimento
      // await filaService.finalizarAtendimento(atendimento.id)

      // Simulando a finalização
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Sucesso",
        description: `Atendimento de ${atendimento.nome} finalizado.`,
      })

      carregarDados()
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error)
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o atendimento.",
        variant: "destructive",
      })
    }
  }

  if (loading && clientes.length === 0 && atendimentos.length === 0) {
    return (
      <div className="container py-6 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando dados da fila...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Fila de Atendimento</h1>
        <Button onClick={() => setFormDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      {error ? (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <Button onClick={carregarDados} className="mt-4">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Clientes na Fila</CardTitle>
            <CardDescription>Gerencie os clientes que estão aguardando atendimento</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Posição</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Chegada</TableHead>
                  <TableHead>Espera</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                      Nenhum cliente na fila de espera
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes.map((cliente, index) => (
                    <TableRow key={cliente.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.servico}</TableCell>
                      <TableCell>{cliente.chegada}</TableCell>
                      <TableCell>{cliente.espera}</TableCell>
                      <TableCell>
                        {cliente.prioridade === "Urgente" ? (
                          <Badge variant="destructive">Urgente</Badge>
                        ) : cliente.prioridade === "Agendado" ? (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-700">
                            Agendado
                          </Badge>
                        ) : (
                          <Badge variant="outline">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleAtenderCliente(cliente)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Atender
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleRemoveClick(cliente)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em Atendimento</CardTitle>
            <CardDescription>Clientes sendo atendidos no momento</CardDescription>
          </CardHeader>
          <CardContent>
            {atendimentos.length === 0 ? (
              <div className="text-center text-muted-foreground py-6">Nenhum cliente em atendimento</div>
            ) : (
              <div className="space-y-4">
                {atendimentos.map((atendimento) => (
                  <div key={atendimento.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{atendimento.nome}</h3>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-700">
                        {atendimento.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Serviço:</span>
                        <span>{atendimento.servico}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Início:</span>
                        <span>{atendimento.inicio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Atendente:</span>
                        <span>{atendimento.atendente}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleFinalizarAtendimento(atendimento)}>
                        Finalizar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de Adicionar Cliente */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
            <DialogDescription>Preencha os dados do cliente para adicioná-lo à fila de atendimento.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Cliente</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleFormChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleFormChange}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="servico">Serviço</Label>
              <Select value={formData.servico} onValueChange={(value) => handleSelectChange("servico", value)}>
                <SelectTrigger id="servico">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="troca-oleo">Troca de Óleo</SelectItem>
                  <SelectItem value="revisao">Revisão Geral</SelectItem>
                  <SelectItem value="freios">Manutenção de Freios</SelectItem>
                  <SelectItem value="pneus">Troca de Pneus</SelectItem>
                  <SelectItem value="eletrica">Sistema Elétrico</SelectItem>
                  <SelectItem value="suspensao">Suspensão</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={formData.prioridade} onValueChange={(value) => handleSelectChange("prioridade", value)}>
                <SelectTrigger id="prioridade">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleFormChange}
                placeholder="Observações adicionais"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCliente}>Adicionar à Fila</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação de Remoção */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover cliente da fila</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover {selectedCliente?.nome} da fila de atendimento?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveConfirm} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

