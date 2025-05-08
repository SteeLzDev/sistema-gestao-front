"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw } from "lucide-react"
import apiClient from "@/services/apiClient"
import { useAuth } from "@/contexts/AuthContext"
import permissionService from "@/services/permissionService"
import { LoadingSpinner } from "@/components/ui/loading-spinner"


import { usePermission } from "@/contexts/PermissionContext"
import errorService from "@/services/erroService"
import { FeedbackMessage } from "@/components/ui/feedback-message"


interface Usuario {
  id: number
  nome: string
  username: string
  email: string
  cargo: string
  perfil: string
}

export default function GerenciarPerfilUsuarioOtimizado() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { refreshAuth } = useAuth()
  const { refreshPermissions, clearPermissionCache } = usePermission()

  const userId = searchParams.get("id") ? Number.parseInt(searchParams.get("id") as string, 10) : 0

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [perfilSelecionado, setPerfilSelecionado] = useState<string>("")
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info" | "warning"
    message: string
  } | null>(null)

  // Função para carregar dados do usuário automaticamente ao montar o componente
  useEffect(() => {
    if (userId && !isNaN(userId)) {
      carregarUsuario()
    }
  }, [userId])

  // Função para carregar dados do usuário
  const carregarUsuario = async () => {
    if (!userId || isNaN(userId)) {
      setErro("ID de usuário inválido")
      return
    }

    try {
      setCarregando(true)
      setErro(null)
      setSucesso(null)

      console.log("Renovando token...")
      try {
        await refreshAuth()
        console.log("Token renovado com sucesso")
      } catch (error) {
        console.error("Erro ao renovar token:", error)
      }

      console.log("Buscando usuário com ID:", userId)
      const response = await apiClient.get(`/usuarios/${userId}`)
      const data = response.data
      console.log("Dados do usuário recebidos:", data)

      setUsuario(data)
      setPerfilSelecionado(data.perfil || "")

      toast({
        title: "Sucesso",
        description: "Dados do usuário carregados com sucesso.",
      })
    } catch (error: any) {
      const standardError = errorService.handleError(error, "Erro ao carregar usuário")
      setErro(standardError.details || "Erro ao carregar dados do usuário")
    } finally {
      setCarregando(false)
    }
  }

  const handleSalvarPerfil = async () => {
    if (!usuario) {
      toast({
        title: "Erro",
        description: "Nenhum usuário carregado para salvar.",
        variant: "destructive",
      })
      return
    }

    try {
      setSalvando(true)
      setErro(null)
      setSucesso(null)

      if (!perfilSelecionado) {
        toast({
          title: "Atenção",
          description: "Selecione um perfil para o usuário.",
          variant: "destructive",
        })
        setSalvando(false)
        return
      }

      console.log("Atribuindo perfil:", perfilSelecionado, "ao usuário:", usuario.id)

      // Usar o serviço específico para atribuir perfil
      await permissionService.atribuirPerfilUsuario(usuario.id, perfilSelecionado)

      // Limpar o cache de permissões para forçar uma atualização na próxima vez
      clearPermissionCache()

      // Se o usuário estiver atualizando seu próprio perfil, atualizar as permissões
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const currentUser = JSON.parse(userStr)
        if (currentUser.id === usuario.id) {
          await refreshPermissions()
        }
      }

      setSucesso(`Perfil ${perfilSelecionado} atribuído com sucesso ao usuário ${usuario.nome}.`)

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso.",
      })

      // Atualizar os dados do usuário para mostrar o novo perfil
      await carregarUsuario()

      // Voltar para a lista de usuários após 2 segundos
      setTimeout(() => {
        router.push("/usuarios")
      }, 2000)
    } catch (error: any) {
      const standardError = errorService.handleError(error, "Erro ao salvar perfil")
      setErro(standardError.details || "Erro ao salvar o perfil do usuário")
    } finally {
      setSalvando(false)
    }
  }

  const handleAssignProfile = async (profileId: string) => {
    try {
      setFeedback(null)
      setSalvando(true)

      // Usar o método correto do permissionService
      await permissionService.atribuirPerfilUsuario(userId, profileId)

      // Limpar o cache de permissões após atribuir um novo perfil
      clearPermissionCache()

      setFeedback({
        type: "success",
        message: "Perfil atribuído com sucesso!",
      })

      // Recarregar os dados do usuário
      await carregarUsuario()
    } catch (error) {
      const standardError = errorService.handleError(error, "Erro ao atribuir perfil")
      setFeedback({
        type: "error",
        message: standardError.details || "Erro ao atribuir perfil ao usuário",
      })
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold ml-4">Gerenciar Perfil do Usuário</h1>
      </div>

      {feedback && <FeedbackMessage type={feedback.type} message={feedback.message} className="mb-4" />}

      {erro && <FeedbackMessage type="error" message={erro} className="mb-4" />}
      {sucesso && <FeedbackMessage type="success" message={sucesso} className="mb-4" />}

      {!usuario && !carregando && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Carregar Dados do Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              ID do usuário: <strong>{userId || "Não especificado"}</strong>
            </p>
            <Button onClick={carregarUsuario} disabled={carregando} className="w-full md:w-auto">
              {carregando ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Carregando...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Carregar Dados do Usuário
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {usuario && (
        <Card>
          <CardHeader>
            <CardTitle>{usuario.nome}</CardTitle>
            <p className="text-sm text-gray-500">
              {usuario.username} | {usuario.email} | {usuario.cargo}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  Perfil atual: <span className="font-bold">{usuario.perfil || "Não definido"}</span>
                </p>
                <Select value={perfilSelecionado} onValueChange={setPerfilSelecionado}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMINISTRADOR">Administrador</SelectItem>
                    <SelectItem value="GERENTE">Gerente</SelectItem>
                    <SelectItem value="VENDEDOR">Vendedor</SelectItem>
                    <SelectItem value="OPERADOR">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mt-2">
                  Ao salvar o perfil, as permissões padrão serão atribuídas automaticamente pelo sistema.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSalvarPerfil} disabled={salvando || perfilSelecionado === usuario.perfil}>
                  {salvando ? <LoadingSpinner size="sm" /> : null}
                  <span className="ml-2">{salvando ? "Salvando..." : "Salvar Perfil"}</span>
                </Button>
                <Button variant="outline" onClick={() => router.push("/usuarios")}>
                  Voltar para Lista
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {carregando && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" text="Carregando dados do usuário..." />
        </div>
      )}
    </div>
  )
}
