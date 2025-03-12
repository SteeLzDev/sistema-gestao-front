"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function FilaPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Fila de Atendimento</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente para adicioná-lo à fila de atendimento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Cliente</Label>
                <Input id="nome" placeholder="Nome completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="servico">Serviço</Label>
                <Select>
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
                <Select>
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
                <Input id="observacoes" placeholder="Observações adicionais" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setOpen(false)}>Adicionar à Fila</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
                {[
                  {
                    pos: 1,
                    nome: "Pedro Alves",
                    servico: "Troca de Óleo",
                    chegada: "09:15",
                    espera: "25 min",
                    prioridade: "Normal",
                  },
                  {
                    pos: 2,
                    nome: "Juliana Costa",
                    servico: "Revisão Geral",
                    chegada: "09:30",
                    espera: "10 min",
                    prioridade: "Urgente",
                  },
                  {
                    pos: 3,
                    nome: "Marcos Souza",
                    servico: "Troca de Pneus",
                    chegada: "09:45",
                    espera: "5 min",
                    prioridade: "Normal",
                  },
                ].map((cliente, index) => (
                  <TableRow key={index}>
                    <TableCell>{cliente.pos}</TableCell>
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
                        <Button size="sm" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Atender
                        </Button>
                        <Button size="sm" variant="ghost">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
            <div className="space-y-4">
              {[
                {
                  nome: "Maria Oliveira",
                  servico: "Troca de Bateria",
                  inicio: "09:00",
                  atendente: "Roberto Santos",
                  status: "Em andamento",
                },
                {
                  nome: "José Silva",
                  servico: "Alinhamento",
                  inicio: "09:10",
                  atendente: "Carlos Pereira",
                  status: "Finalizando",
                },
              ].map((atendimento, index) => (
                <div key={index} className="border rounded-lg p-4">
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
                    <Button size="sm" variant="outline">
                      Finalizar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

