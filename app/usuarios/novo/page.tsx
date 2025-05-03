"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Save } from "lucide-react"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"

export default function NovoUsuarioPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [usuario, setUsuario] = useState({
    username: "",
    nome: "",
    email: "", // Adicionar campo de email
    senha: "",
    cargo: "",
    perfil: "Operador",
    status: "Ativo",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detalhesErro, setDetalhesErro] = useState<string | null>(null)
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false)

  // Verificar se o usuário tem permissão para criar usuários
  const canCreateUser =
    user?.permissoes?.includes("USUARIOS_CRIAR") || user?.perfil === "Administrador" || user?.perfil === "ADMIN"

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para atualizar o perfil
  const handleSelectChange = (name: string, value: string) => {
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para salvar o usuário usando Axios diretamente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario.username || !usuario.nome || !usuario.senha) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (!canCreateUser) {
      setError("Você não tem permissão para criar usuários.")
      return
    }

    setLoading(true)
    setError(null)
    setDetalhesErro(null)

    try {
      // Verificar se o token está disponível
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Token de autenticação não encontrado. Por favor, faça login novamente.")
        toast({
          title: "Erro de autenticação",
          description: "Token não encontrado. Por favor, faça login novamente.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      console.log("Token disponível:", token.substring(0, 20) + "...")

      // Converter username para minúsculas
      const usuarioData = {
        ...usuario,
        username: usuario.username.toLowerCase(),
      }

      console.log("Enviando dados do usuário:", usuarioData)

      // Usar Axios diretamente para evitar problemas com interceptors
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"

      // Tentar com /usuarios (sem /api)
      const url = `${baseUrl}/usuarios`
      console.log("Enviando requisição para:", url)

      const response = await axios({
        method: "post",
        url: url,
        data: usuarioData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Resposta:", response.data)

      toast({
        title: "Usuário criado",
        description: `O usuário ${usuario.nome} foi criado com sucesso.`,
      })

      // Redirecionar para a lista de usuários
      router.push("/usuarios")
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err)

      // Capturar detalhes do erro para depuração
      let mensagemErro = "Erro ao criar usuário."
      let detalhes = ""

      if (err.response) {
        mensagemErro = `Erro ${err.response.status}: ${err.response.statusText}`
        try {
          detalhes = JSON.stringify(err.response.data, null, 2)
        } catch (e) {
          detalhes = "Não foi possível serializar os detalhes do erro."
        }
      } else if (err.request) {
        mensagemErro = "Não houve resposta do servidor."
        detalhes = "Verifique se o servidor está online e acessível."
      } else {
        mensagemErro = err.message || "Erro desconhecido."
      }

      setError(mensagemErro)
      setDetalhesErro(detalhes)

      // Verificar se é um erro de autenticação
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast({
          title: "Erro de autenticação",
          description: "Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.",
          variant: "destructive",
        })
      } else {
        // Exibir mensagem de erro específica se disponível
        const errorMessage =
          err.response?.data?.message || err.message || "Não foi possível criar o usuário. Tente novamente."

        toast({
          title: "Erro ao criar usuário",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Se o usuário não tem permissão para criar usuários, mostrar mensagem
  if (!canCreateUser) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h2 className="text-3xl font-bold tracking-tight">Novo Usuário</h2>
        </div>

        <div className="flex justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Você não tem permissão para criar usuários.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        <h2 className="text-3xl font-bold tracking-tight">Novo Usuário</h2>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dados do Usuário</CardTitle>
          <CardDescription>Preencha os dados para criar um novo usuário no sistema</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                  {detalhesErro && (
                    <div className="mt-2">
                      <Button variant="outline" size="sm" onClick={() => setMostrarDetalhes(!mostrarDetalhes)}>
                        {mostrarDetalhes ? "Ocultar detalhes" : "Mostrar detalhes"}
                      </Button>
                      {mostrarDetalhes && (
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                          {detalhesErro}
                        </pre>
                      )}
                    </div>
                  )}
                </AlertDescription>
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
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={usuario.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha*</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={usuario.senha}
                onChange={handleChange}
                placeholder="Digite a senha"
                required
              />
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
      </Card>
    </div>
  )
}
