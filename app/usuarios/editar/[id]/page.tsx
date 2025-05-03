"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Permission } from "@/types/permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Save } from "lucide-react"
import usuarioService from "@/services/usuarioService"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"

export default function EditarUsuarioPage() {
  const router = useRouter()
  const params = useParams()
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const id = Number(params.id)

  const [usuario, setUsuario] = useState({
    id,
    username: "",
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    perfil: "Operador",
    status: "Ativo",
  })

  const [loading, setLoading] = useState(false)
  const [loadingUsuario, setLoadingUsuario] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verificar se o usuário tem permissão para editar usuários
  const canEditUser = hasPermission(Permission.EDIT_USER) || hasPermission("USUARIOS_EDITAR")

  // Carregar dados do usuário
  useEffect(() => {
    const carregarUsuario = async () => {
      if (!id) return

      try {
        setLoadingUsuario(true)
        const data = await usuarioService.buscarUsuario(id)
        setUsuario({
          ...data,
          senha: "", // Não exibir a senha atual
        })
      } catch (err: any) {
        console.error(`Erro ao carregar usuário ${id}:`, err)
        setError(`Erro ao carregar usuário. ${err.message || "Tente novamente."}`)
        toast({
          title: "Erro",
          description: `Não foi possível carregar os dados do usuário. ${err.message || ""}`,
          variant: "destructive",
        })
      } finally {
        setLoadingUsuario(false)
      }
    }

    carregarUsuario()
  }, [id, toast])

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para atualizar o perfil e status
  const handleSelectChange = (name: string, value: string) => {
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para salvar o usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario.username || !usuario.nome) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (!canEditUser) {
      setError("Você não tem permissão para editar usuários.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Se a senha estiver vazia, não enviar no objeto
      const usuarioAtualizado = {
        ...usuario,
        senha: usuario.senha || undefined,
      }

      await usuarioService.atualizarUsuario(id, usuarioAtualizado)

      toast({
        title: "Usuário atualizado",
        description: `O usuário ${usuario.nome} foi atualizado com sucesso.`,
      })

      // Redirecionar para a lista de usuários
      router.push("/usuarios")
    } catch (err: any) {
      console.error("Erro ao atualizar usuário:", err)
      setError(err.message || "Não foi possível atualizar o usuário. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Se o usuário não tem permissão para editar usuários, mostrar mensagem
  if (!canEditUser) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Editar Usuário</h2>
        </div>

        <div className="flex justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Você não tem permissão para editar usuários.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        <h2 className="text-3xl font-bold tracking-tight">Editar Usuário</h2>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dados do Usuário</CardTitle>
          <CardDescription>Edite os dados do usuário</CardDescription>
        </CardHeader>
        {loadingUsuario ? (
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Carregando dados do usuário...</p>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário*</Label>
                <Input
                  id="username"
                  name="username"
                  value={usuario.username}
                  onChange={handleChange}
                  placeholder="Digite o nome de usuário"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo*</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={usuario.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={usuario.email}
                  onChange={handleChange}
                  placeholder="Digite o e-mail"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={usuario.senha}
                  onChange={handleChange}
                  placeholder="Digite a nova senha"
                />
                <p className="text-xs text-muted-foreground">Deixe em branco para manter a senha atual.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  name="cargo"
                  value={usuario.cargo}
                  onChange={handleChange}
                  placeholder="Ex: Gerente, Atendente, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="perfil">Perfil*</Label>
                <Select value={usuario.perfil} onValueChange={(value) => handleSelectChange("perfil", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select value={usuario.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/usuarios")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
