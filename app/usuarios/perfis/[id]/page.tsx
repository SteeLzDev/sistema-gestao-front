"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/ui/BackButton"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import usuarioService, { type Usuario } from "@/services/usuarioService"
import permissionService from "@/services/permissionService"
import { useAuth } from "@/contexts/AuthContext"

interface PageProps {
  params: {
    id: string
  }
}

export default function GerenciarPerfilUsuario({ params }: PageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { refreshAuth, isAuthenticated } = useAuth()

  // Acessar o ID diretamente, mas com verificação
  const userId = params?.id ? Number.parseInt(params.id, 10) : 0

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [perfilSelecionado, setPerfilSelecionado] = useState<string>("")
  const [salvando, setSalvando] = useState(false)
  const [permissoes, setPermissoes] = useState<string[]>([])
  const [erro, setErro] = useState<string | null>(null)
  const [tentativas, setTentativas] = useState(0)

  // Função para carregar usuário com retry
  const carregarUsuario = useCallback(async () => {
    if (!userId || isNaN(userId)) {
      setErro("ID de usuário inválido")
      setCarregando(false)
      return
    }

    try {
      setCarregando(true)
      setErro(null)

      // Verificar se já tentamos muitas vezes
      if (tentativas >= 3) {
        setErro("Número máximo de tentativas excedido. Por favor, tente novamente mais tarde.")
        setCarregando(false)
        return
      }

      // Tentar buscar o usuário
      try {
        console.log("Buscando usuário com ID:", userId)
        const data = await usuarioService.buscarUsuario(userId)
        console.log("Dados do usuário recebidos:", data)
        setUsuario(data)
        setPerfilSelecionado(data.perfil || "")

        // Carregar permissões atuais
        console.log("Buscando permissões para o usuário:", userId)
        const userPermissoes = await usuarioService.obterPermissoes(userId)
        console.log("Permissões recebidas:", userPermissoes)
        setPermissoes(userPermissoes)

        // Resetar contador de tentativas em caso de sucesso
        setTentativas(0)
      } catch (error: any) {
        console.error("Erro ao carregar usuário:", error)

        // Se for um erro de autenticação, tentar renovar o token uma vez
        if (error.response && error.response.status === 401 && tentativas < 1) {
          console.log(`Tentativa ${tentativas + 1}: Renovando token...`)

          // Incrementar contador de tentativas
          setTentativas((prev) => prev + 1)

          // Tentar renovar o token
          try {
            await refreshAuth()
            // Tentar novamente após um breve delay
            setTimeout(() => carregarUsuario(), 1000)
            return
          } catch (refreshError) {
            console.error("Erro ao renovar token:", refreshError)
            // Se não conseguiu renovar, mostrar erro de autenticação
            setErro("Sua sessão expirou. Por favor, faça login novamente.")
            setTimeout(() => router.push("/login"), 2000)
            return
          }
        }

        // Para outros erros ou se já tentamos renovar o token
        setErro(`Não foi possível carregar os dados do usuário. ${error.message || ""}`)
      }
    } finally {
      setCarregando(false)
    }
  }, [userId, router, refreshAuth, tentativas])

  useEffect(() => {
    // Só carregar uma vez quando o componente montar e userId for válido
    if (userId && !isNaN(userId) && tentativas === 0) {
      carregarUsuario()
    }
  }, [userId, carregarUsuario, tentativas])

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated && !carregando) {
      router.push("/login")
    }
  }, [isAuthenticated, carregando, router])

  const handleSalvarPerfil = async () => {
    if (!usuario) return

    try {
      setSalvando(true)
      setErro(null)

      if (!perfilSelecionado) {
        toast({
          title: "Atenção",
          description: "Selecione um perfil para o usuário.",
          variant: "destructive",
        })
        return
      }

      // Tentar renovar o token antes de fazer a requisição
      try {
        await refreshAuth()
      } catch (error) {
        console.error("Erro ao renovar token antes de salvar:", error)
        // Continuar mesmo se falhar a renovação
      }

      console.log("Atribuindo perfil:", perfilSelecionado, "ao usuário:", usuario.id)
      // Atualizar o perfil do usuário e atribuir permissões padrão
      await permissionService.atribuirPerfilUsuario(usuario.id, perfilSelecionado)
      console.log("Perfil atribuído com sucesso")

      toast({
        title: "Sucesso",
        description: "Perfil e permissões atualizados com sucesso.",
      })

      // Atualizar o usuário local
      setUsuario({
        ...usuario,
        perfil: perfilSelecionado,
      })

      // Recarregar permissões atualizadas
      console.log("Recarregando permissões atualizadas")
      const userPermissoes = await usuarioService.obterPermissoes(userId)
      setPermissoes(userPermissoes)
      console.log("Novas permissões:", userPermissoes)

      // Voltar para a lista de usuários após salvar com sucesso
      setTimeout(() => {
        router.push("/usuarios")
      }, 1500)
    } catch (error: any) {
      console.error("Erro ao salvar perfil:", error)

      // Verificar se é um erro de autenticação
      if (error.response && error.response.status === 401) {
        setErro("Sua sessão expirou. Por favor, faça login novamente.")

        // Redirecionar para login após um breve delay
        setTimeout(() => {
          router.push("/login")
        }, 2000)
        return
      }

      toast({
        title: "Erro",
        description: `Não foi possível salvar o perfil do usuário. ${error.message || ""}`,
        variant: "destructive",
      })
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando dados do usuário...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold ml-4">Erro</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/usuarios")}>Voltar para Lista de Usuários</Button>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold ml-4">Usuário não encontrado</h1>
        </div>
        <p>O usuário solicitado não foi encontrado.</p>
        <div className="mt-4">
          <Button onClick={() => router.push("/usuarios")}>Voltar para Lista de Usuários</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold ml-4">Gerenciar Perfil do Usuário</h1>
      </div>

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
              <p className="text-sm font-medium mb-2">Permissões atuais:</p>
              <div className="p-3 bg-gray-50 rounded-md max-h-40 overflow-y-auto">
                {permissoes.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {permissoes.map((perm, index) => (
                      <li key={index} className="text-sm">
                        {perm}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Nenhuma permissão atribuída</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ao salvar o perfil, as permissões padrão serão atribuídas automaticamente.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSalvarPerfil} disabled={salvando}>
                {salvando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {salvando ? "Salvando..." : "Salvar Perfil e Atribuir Permissões"}
              </Button>
              <Button variant="outline" onClick={() => router.push(`/usuarios/permissoes/${usuario.id}`)}>
                Gerenciar Permissões Manualmente
              </Button>
              <Button variant="outline" onClick={() => router.push("/usuarios")}>
                Voltar para Lista
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
