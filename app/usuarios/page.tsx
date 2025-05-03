"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import apiClient from "@/services/apiClient"
import { useAuth } from "@/contexts/AuthContext"
import { BackButton } from "@/components/ui/BackButton"

interface Usuario {
  id: number
  nome: string
  username: string
  email: string
  cargo: string
  perfil: string
}

export default function UsuariosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { refreshAuth } = useAuth()

  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativas, setTentativas] = useState(0)
  const [excluindo, setExcluindo] = useState<number | null>(null)

  // Função para carregar a lista de usuários
  const carregarUsuarios = async () => {
    if (tentativas > 3) {
      setErro("Número máximo de tentativas excedido. Por favor, recarregue a página.")
      setCarregando(false)
      return
    }

    try {
      setCarregando(true)
      setErro(null)

      // Tentar renovar o token antes de fazer a requisição
      try {
        await refreshAuth()
      } catch (error) {
        console.error("Erro ao renovar token:", error)
      }

      const response = await apiClient.get("/usuarios")
      setUsuarios(response.data)
    } catch (error: any) {
      console.error("Erro ao carregar usuários:", error)

      // Verificar se é um erro de autenticação
      if (error.response && error.response.status === 401) {
        setErro("Sua sessão expirou. Por favor, faça login novamente.")
        setTimeout(() => router.push("/login"), 2000)
        return
      }

      setErro(`Não foi possível carregar a lista de usuários. ${error.message || ""}`)
      setTentativas((prev) => prev + 1)

      // Tentar novamente após 2 segundos
      setTimeout(() => carregarUsuarios(), 2000)
    } finally {
      setCarregando(false)
    }
  }

  // Carregar usuários ao montar o componente
  useEffect(() => {
    carregarUsuarios()
  }, [])

  // Função para excluir um usuário
  const excluirUsuario = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
      return
    }

    try {
      setExcluindo(id)

      // Tentar renovar o token antes de fazer a requisição
      try {
        await refreshAuth()
      } catch (error) {
        console.error("Erro ao renovar token:", error)
      }

      await apiClient.delete(`/usuarios/${id}`)

      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso.",
      })

      // Atualizar a lista de usuários
      carregarUsuarios()
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error)

      toast({
        title: "Erro",
        description: `Não foi possível excluir o usuário. ${error.message || ""}`,
        variant: "destructive",
      })
    } finally {
      setExcluindo(null)
    }
  }

  // Função para navegar para a página de gerenciamento de perfil
  const gerenciarPerfil = (id: number) => {
    router.push(`/usuarios/perfis/otimizado?id=${id}`)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Usuários</h1>
        </div>
        <Button onClick={() => router.push("/usuarios/novo")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {erro && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          {carregando ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : usuarios.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nome}</TableCell>
                      <TableCell>{usuario.username}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.cargo}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(usuario.perfil)}>{usuario.perfil || "Não definido"}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => gerenciarPerfil(usuario.id)}
                            title="Gerenciar Perfil"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(`/usuarios/editar/${usuario.id}`)}
                            title="Editar Usuário"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => excluirUsuario(usuario.id)}
                            disabled={excluindo === usuario.id}
                            title="Excluir Usuário"
                          >
                            {excluindo === usuario.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">Nenhum usuário encontrado.</p>
          )}

          {!carregando && (
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={carregarUsuarios}>
                Atualizar Lista
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Função auxiliar para determinar a variante do badge com base no perfil
function getBadgeVariant(perfil: string | undefined): "default" | "secondary" | "destructive" | "outline" {
  if (!perfil) return "outline"

  switch (perfil.toUpperCase()) {
    case "ADMINISTRADOR":
    case "ADMIN":
      return "destructive"
    case "GERENTE":
      return "secondary"
    default:
      return "default"
  }
}
