"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { filaService } from "@/services/filaService"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"

export default function AdicionarClientePage() {
  const router = useRouter()
  const { hasPermission } = useAuth()
  const { toast } = useToast()

  // Atualize o estado inicial do cliente para incluir a propriedade status
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    servico: "",
    prioridade: "normal",
    status: "AGUARDANDO", // Adicionando o status que estava faltando
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar se o usuário tem permissão para gerenciar a fila
  const canManageQueue = hasPermission(Permission.MANAGE_QUEUE) || hasPermission("FILA_GERENCIAR")

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para atualizar o campo de prioridade
  const handlePrioridadeChange = (value: string) => {
    setCliente((prev) => ({
      ...prev,
      prioridade: value,
    }))
  }

  // Função para adicionar cliente à fila
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cliente.nome || !cliente.servico) {
      setError("Nome e serviço são obrigatórios.")
      return
    }

    if (!canManageQueue) {
      setError("Você não tem permissão para adicionar clientes à fila.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await filaService.adicionarClienteNaFila(cliente)

      toast({
        title: "Cliente adicionado",
        description: "Cliente adicionado à fila com sucesso.",
      })

      // Redirecionar para a página da fila
      router.push("/fila")
    } catch (err: any) {
      console.error("Erro ao adicionar cliente à fila:", err)

      let mensagemErro = "Erro ao adicionar cliente à fila. "

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
        title: "Erro ao adicionar cliente",
        description: mensagemErro,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Se o usuário não tem permissão para gerenciar a fila, mostrar mensagem
  if (!canManageQueue) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Adicionar Cliente à Fila</h2>
        </div>

        <div className="flex justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Você não tem permissão para adicionar clientes à fila.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h2 className="text-3xl font-bold tracking-tight">Adicionar Cliente à Fila</h2>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dados do Cliente</CardTitle>
          <CardDescription>Preencha os dados do cliente para adicionar à fila de atendimento</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
                placeholder="Nome completo do cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servico">Serviço</Label>
              <Input
                id="servico"
                name="servico"
                value={cliente.servico}
                onChange={handleChange}
                placeholder="Tipo de serviço solicitado"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone (opcional)</Label>
              <Input
                id="telefone"
                name="telefone"
                value={cliente.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={cliente.prioridade} onValueChange={handlePrioridadeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/fila")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Adicionar à Fila"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
