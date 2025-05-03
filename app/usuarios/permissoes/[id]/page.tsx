"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/ui/BackButton"
import { useAuth } from "@/contexts/AuthContext"
import usuarioService from "@/services/usuarioService"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Check, Info } from 'lucide-react'

// Definição de tipos para as permissões
interface Permissao {
  id: string
  label: string
  descricao?: string
}

// Definição de tipos para as categorias de permissões
interface CategoriaPermissoes {
  [categoria: string]: Permissao[]
}

// Definição de tipos para os perfis de permissão
interface PerfilPermissao {
  id: string
  nome: string
  descricao: string
  permissoes: string[]
}

// Definição das permissões por categoria
const permissoesPorCategoria: CategoriaPermissoes = {
  Estoque: [
    { id: "ESTOQUE_VISUALIZAR", label: "Visualizar estoque", descricao: "Permite visualizar o estoque de produtos" },
    { id: "ESTOQUE_ADICIONAR", label: "Adicionar produtos", descricao: "Permite adicionar novos produtos ao estoque" },
    { id: "ESTOQUE_EDITAR", label: "Editar produtos", descricao: "Permite editar informações de produtos existentes" },
    { id: "ESTOQUE_REMOVER", label: "Remover produtos", descricao: "Permite remover produtos do estoque" },
  ],
  Vendas: [
    { id: "VENDAS_VISUALIZAR", label: "Visualizar vendas", descricao: "Permite visualizar o histórico de vendas" },
    { id: "VENDAS_CRIAR", label: "Criar vendas", descricao: "Permite registrar novas vendas no sistema" },
    { id: "VENDAS_CANCELAR", label: "Cancelar vendas", descricao: "Permite cancelar vendas registradas" },
    {
      id: "VENDAS_RELATORIOS",
      label: "Relatórios de vendas",
      descricao: "Permite gerar e visualizar relatórios de vendas",
    },
  ],
  Fila: [
    { id: "FILA_VISUALIZAR", label: "Visualizar fila", descricao: "Permite visualizar a fila de atendimento" },
    {
      id: "FILA_ADICIONAR",
      label: "Adicionar clientes",
      descricao: "Permite adicionar clientes à fila de atendimento",
    },
    { id: "FILA_REMOVER", label: "Remover clientes", descricao: "Permite remover clientes da fila de atendimento" },
    { id: "FILA_GERENCIAR", label: "Gerenciar atendimentos", descricao: "Permite gerenciar o fluxo de atendimentos" },
  ],
  Usuários: [
    { id: "USUARIOS_VISUALIZAR", label: "Visualizar usuários", descricao: "Permite visualizar a lista de usuários" },
    { id: "USUARIOS_ADICIONAR", label: "Adicionar usuários", descricao: "Permite adicionar novos usuários ao sistema" },
    { id: "USUARIOS_EDITAR", label: "Editar usuários", descricao: "Permite editar informações de usuários existentes" },
    { id: "USUARIOS_REMOVER", label: "Remover usuários", descricao: "Permite remover usuários do sistema" },
    {
      id: "USUARIOS_PERMISSOES",
      label: "Gerenciar permissões",
      descricao: "Permite gerenciar permissões de outros usuários",
    },
  ],
  Sistema: [
    {
      id: "CONFIGURACOES_VISUALIZAR",
      label: "Visualizar configurações",
      descricao: "Permite visualizar as configurações do sistema",
    },
    {
      id: "CONFIGURACOES_EDITAR",
      label: "Editar configurações",
      descricao: "Permite editar as configurações do sistema",
    },
    {
      id: "RELATORIOS_VISUALIZAR",
      label: "Visualizar relatórios",
      descricao: "Permite visualizar relatórios gerais do sistema",
    },
    {
      id: "RELATORIOS_EXPORTAR",
      label: "Exportar relatórios",
      descricao: "Permite exportar relatórios para formatos externos",
    },
    { id: "BACKUP_GERENCIAR", label: "Gerenciar backups", descricao: "Permite gerenciar backups do sistema" },
  ],
}

// Definição dos perfis de permissão
const perfisPermissao: PerfilPermissao[] = [
  {
    id: "admin",
    nome: "Administrador",
    descricao: "Acesso completo ao sistema",
    permissoes: [
      "ESTOQUE_VISUALIZAR",
      "ESTOQUE_ADICIONAR",
      "ESTOQUE_EDITAR",
      "ESTOQUE_REMOVER",
      "VENDAS_VISUALIZAR",
      "VENDAS_CRIAR",
      "VENDAS_CANCELAR",
      "VENDAS_RELATORIOS",
      "FILA_VISUALIZAR",
      "FILA_ADICIONAR",
      "FILA_REMOVER",
      "FILA_GERENCIAR",
      "USUARIOS_VISUALIZAR",
      "USUARIOS_ADICIONAR",
      "USUARIOS_EDITAR",
      "USUARIOS_REMOVER",
      "USUARIOS_PERMISSOES",
      "CONFIGURACOES_VISUALIZAR",
      "CONFIGURACOES_EDITAR",
      "RELATORIOS_VISUALIZAR",
      "RELATORIOS_EXPORTAR",
      "BACKUP_GERENCIAR",
    ],
  },
  {
    id: "gerente",
    nome: "Gerente",
    descricao: "Acesso gerencial ao sistema",
    permissoes: [
      "ESTOQUE_VISUALIZAR",
      "ESTOQUE_ADICIONAR",
      "ESTOQUE_EDITAR",
      "VENDAS_VISUALIZAR",
      "VENDAS_CRIAR",
      "VENDAS_CANCELAR",
      "VENDAS_RELATORIOS",
      "FILA_VISUALIZAR",
      "FILA_ADICIONAR",
      "FILA_REMOVER",
      "FILA_GERENCIAR",
      "USUARIOS_VISUALIZAR",
      "USUARIOS_ADICIONAR",
      "USUARIOS_EDITAR",
      "CONFIGURACOES_VISUALIZAR",
      "RELATORIOS_VISUALIZAR",
      "RELATORIOS_EXPORTAR",
    ],
  },
  {
    id: "vendedor",
    nome: "Vendedor",
    descricao: "Acesso às funcionalidades de vendas",
    permissoes: [
      "ESTOQUE_VISUALIZAR",
      "VENDAS_VISUALIZAR",
      "VENDAS_CRIAR",
      "FILA_VISUALIZAR",
      "FILA_ADICIONAR",
      "FILA_GERENCIAR",
    ],
  },
  {
    id: "estoquista",
    nome: "Estoquista",
    descricao: "Acesso às funcionalidades de estoque",
    permissoes: ["ESTOQUE_VISUALIZAR", "ESTOQUE_ADICIONAR", "ESTOQUE_EDITAR", "ESTOQUE_REMOVER"],
  },
  {
    id: "atendente",
    nome: "Atendente",
    descricao: "Acesso às funcionalidades de atendimento",
    permissoes: [
      "ESTOQUE_VISUALIZAR",
      "VENDAS_VISUALIZAR",
      "VENDAS_CRIAR",
      "FILA_VISUALIZAR",
      "FILA_ADICIONAR",
      "FILA_REMOVER",
      "FILA_GERENCIAR",
    ],
  },
]

// Função para criar um objeto com todas as permissões definidas como false
const criarPermissoesVazias = (): Record<string, boolean> => {
  const todasPermissoes: Record<string, boolean> = {}
  Object.values(permissoesPorCategoria).forEach((categoria) => {
    categoria.forEach((perm) => {
      todasPermissoes[perm.id] = false
    })
  })
  return todasPermissoes
}

// Interface para o histórico de alterações
interface AlteracaoPermissao {
  permissaoId: string
  valorAnterior: boolean
  valorNovo: boolean
  timestamp: number
}

export default function PermissoesUsuarioPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const [usuario, setUsuario] = useState<any>(null)
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<Record<string, boolean>>(criarPermissoesVazias())
  const [permissoesOriginais, setPermissoesOriginais] = useState<Record<string, boolean>>(criarPermissoesVazias())
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativasCarregamento, setTentativasCarregamento] = useState(0)
  const [mostrarErroCompleto, setMostrarErroCompleto] = useState(false)
  const [erroDetalhado, setErroDetalhado] = useState<string | null>(null)
  const [historicoAlteracoes, setHistoricoAlteracoes] = useState<AlteracaoPermissao[]>([])
  const [mostrarHistorico, setMostrarHistorico] = useState(false)
  const [sincronizando, setSincronizando] = useState(false)

  // Referência para o estado das permissões para debug
  const permissoesRef = useRef<Record<string, boolean>>({})

  // Verificar se o usuário tem permissão para gerenciar permissões
  const canManagePermissions =
    user?.permissoes?.includes("USUARIOS_PERMISSOES") || user?.perfil === "Administrador" || user?.perfil === "ADMIN"

  // Função para adicionar ao histórico de alterações
  const adicionarAoHistorico = useCallback((permissaoId: string, valorAnterior: boolean, valorNovo: boolean) => {
    setHistoricoAlteracoes((prev) => [
      ...prev,
      {
        permissaoId,
        valorAnterior,
        valorNovo,
        timestamp: Date.now(),
      },
    ])
  }, [])

  // Função para inicializar o estado das permissões
  const inicializarPermissoes = useCallback(
    (permissoesArray: string[]) => {
      // Verificar primeiro se há permissões no localStorage
      if (typeof window !== "undefined" && id) {
        const storageKey = `permissoes_usuario_${id}`
        const savedPermissoes = localStorage.getItem(storageKey)
        if (savedPermissoes) {
          try {
            const parsedPermissoes = JSON.parse(savedPermissoes)
            console.log("Usando permissões do localStorage em vez da API")
            return parsedPermissoes
          } catch (e) {
            console.error("Erro ao analisar permissões do localStorage:", e)
          }
        }
      }

      // Se não houver permissões no localStorage, usar as da API
      console.log("Usando permissões da API")
      const todasPermissoes = criarPermissoesVazias()

      // Marcar as permissões que o usuário possui como true
      if (Array.isArray(permissoesArray)) {
        permissoesArray.forEach((perm) => {
          if (perm in todasPermissoes) {
            todasPermissoes[perm] = true
          }
        })
      }

      return todasPermissoes
    },
    [id],
  )

  // Verificar se uma permissão foi alterada
  const permissaoAlterada = useCallback(
    (permissaoId: string) => {
      return permissoesSelecionadas[permissaoId] !== permissoesOriginais[permissaoId]
    },
    [permissoesSelecionadas, permissoesOriginais],
  )

  // Verificar se há alterações não salvas
  const temAlteracoes = useCallback(() => {
    return Object.keys(permissoesSelecionadas).some(
      (permissaoId) => permissoesSelecionadas[permissaoId] !== permissoesOriginais[permissaoId],
    )
  }, [permissoesSelecionadas, permissoesOriginais])

  // Carregar dados do usuário e permissões
  useEffect(() => {
    const carregarDados = async () => {
      if (!id) return

      // Verificar se o usuário tem permissão
      if (!canManagePermissions) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para gerenciar permissões de usuários.",
          variant: "destructive",
        })
        return
      }

      setCarregando(true)
      setErro(null)
      setErroDetalhado(null)

      try {
        // Definir um timeout para evitar carregamento infinito
        const timeoutId = setTimeout(() => {
          setErro("Tempo limite excedido ao carregar permissões. Tente novamente.")
          setCarregando(false)
        }, 15000) // 15 segundos de timeout

        // Carregar dados do usuário
        const dadosUsuario = await usuarioService.buscarUsuario(Number(id))

        if (!dadosUsuario) {
          clearTimeout(timeoutId)
          setErro("Usuário não encontrado")
          setCarregando(false)
          return
        }

        setUsuario(dadosUsuario)

        // Verificar se o usuário tem permissões
        let permissoesArray: string[] = []
        if (dadosUsuario.permissoes && Array.isArray(dadosUsuario.permissoes)) {
          permissoesArray = dadosUsuario.permissoes
        } else {
          // Tentar carregar permissões separadamente
          try {
            const permissoesUsuario = await usuarioService.obterPermissoes(Number(id))
            permissoesArray = permissoesUsuario || []
          } catch (permError: any) {
            console.error("Erro ao carregar permissões separadamente:", permError)
            permissoesArray = []
          }
        }

        // Inicializar permissões - esta função agora verifica o localStorage primeiro
        const permissoes = inicializarPermissoes(permissoesArray)
        setPermissoesSelecionadas(permissoes)

        // Atualizar a referência para debug
        permissoesRef.current = permissoes

        // Guardar estado original para comparação (sempre da API)
        const permissoesOriginaisAPI = criarPermissoesVazias()
        if (Array.isArray(permissoesArray)) {
          permissoesArray.forEach((perm) => {
            if (perm in permissoesOriginaisAPI) {
              permissoesOriginaisAPI[perm] = true
            }
          })
        }
        setPermissoesOriginais(permissoesOriginaisAPI)

        clearTimeout(timeoutId)
        setCarregando(false)
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error)

        // Capturar mensagem de erro detalhada
        let mensagemErro = "Erro ao carregar dados. Tente novamente."
        let detalhesErro = ""

        if (error.response) {
          mensagemErro = `Erro ${error.response.status}: ${error.response.statusText}`
          detalhesErro = JSON.stringify(error.response.data || {}, null, 2)
        } else if (error.message) {
          mensagemErro = error.message
          detalhesErro = error.stack || ""
        }

        setErro(mensagemErro)
        setErroDetalhado(detalhesErro)
        setCarregando(false)

        // Incrementar tentativas e tentar novamente se necessário
        const novasTentativas = tentativasCarregamento + 1
        setTentativasCarregamento(novasTentativas)

        if (novasTentativas < 3) {
          // Tentar novamente após um intervalo
          setTimeout(() => {
            carregarDados()
          }, 2000)
        }
      }
    }

    carregarDados()
  }, [id, toast, tentativasCarregamento, canManagePermissions, inicializarPermissoes])

  // Salvar permissões no localStorage para persistência entre recarregamentos
  useEffect(() => {
    if (typeof window !== "undefined" && id && Object.keys(permissoesSelecionadas).length > 0 && !carregando) {
      const storageKey = `permissoes_usuario_${id}`
      localStorage.setItem(storageKey, JSON.stringify(permissoesSelecionadas))

      // Atualizar a referência para debug
      permissoesRef.current = permissoesSelecionadas
    }
  }, [permissoesSelecionadas, id, carregando])

  // Nova função para alternar permissão usando o objeto de estado
  const handleTogglePermissao = useCallback(
    (permissaoId: string) => {
      setPermissoesSelecionadas((prev) => {
        const valorAnterior = prev[permissaoId]
        const valorNovo = !valorAnterior

        // Adicionar ao histórico
        adicionarAoHistorico(permissaoId, valorAnterior, valorNovo)

        return {
          ...prev,
          [permissaoId]: valorNovo,
        }
      })
    },
    [adicionarAoHistorico],
  )

  // Função para selecionar/desmarcar todas as permissões de uma categoria
  const handleToggleCategoria = useCallback(
    (categoria: string, selecionar: boolean) => {
      setPermissoesSelecionadas((prev) => {
        const novoEstado = { ...prev }
        permissoesPorCategoria[categoria].forEach((perm) => {
          // Adicionar ao histórico apenas se o valor for alterado
          if (novoEstado[perm.id] !== selecionar) {
            adicionarAoHistorico(perm.id, novoEstado[perm.id], selecionar)
          }
          novoEstado[perm.id] = selecionar
        })
        return novoEstado
      })
    },
    [adicionarAoHistorico],
  )

  // Função para aplicar um perfil de permissão
  const aplicarPerfil = useCallback(
    (perfilId: string) => {
      const perfil = perfisPermissao.find((p) => p.id === perfilId)
      if (!perfil) return

      setPermissoesSelecionadas((prev) => {
        const novoEstado = { ...prev }

        // Primeiro, definir todas as permissões como false
        Object.keys(novoEstado).forEach((permId) => {
          if (novoEstado[permId] !== false) {
            adicionarAoHistorico(permId, novoEstado[permId], false)
            novoEstado[permId] = false
          }
        })

        // Depois, definir as permissões do perfil como true
        perfil.permissoes.forEach((permId) => {
          if (permId in novoEstado && novoEstado[permId] !== true) {
            adicionarAoHistorico(permId, novoEstado[permId], true)
            novoEstado[permId] = true
          }
        })

        return novoEstado
      })

      toast({
        title: "Perfil aplicado",
        description: `O perfil ${perfil.nome} foi aplicado com sucesso.`,
      })
    },
    [adicionarAoHistorico, toast],
  )

  // Função para sincronizar com o servidor
  const sincronizarComServidor = async () => {
    if (!id) return

    setSincronizando(true)
    try {
      // Carregar permissões do servidor
      const permissoesServidor = await usuarioService.obterPermissoes(Number(id))
      console.log("Permissões recebidas do servidor:", permissoesServidor)

      // Criar um novo objeto de permissões
      const novasPermissoes = criarPermissoesVazias()

      // Marcar as permissões que o usuário possui como true
      if (Array.isArray(permissoesServidor)) {
        permissoesServidor.forEach((perm) => {
          if (perm in novasPermissoes) {
            novasPermissoes[perm] = true
          }
        })
      }

      console.log("Novas permissões após processamento:", novasPermissoes)

      // Atualizar o localStorage primeiro
      if (typeof window !== "undefined") {
        const storageKey = `permissoes_usuario_${id}`
        localStorage.setItem(storageKey, JSON.stringify(novasPermissoes))
      }

      // Atualizar a referência para debug
      permissoesRef.current = novasPermissoes

      // Atualizar os estados
      setPermissoesSelecionadas(novasPermissoes)
      setPermissoesOriginais({ ...novasPermissoes })

      // Verificar se as permissões foram atualizadas corretamente
      setTimeout(() => {
        console.log("Estado das permissões após sincronização:", permissoesRef.current)
      }, 100)

      toast({
        title: "Sincronização concluída",
        description: "As permissões foram sincronizadas com o servidor.",
      })
    } catch (error) {
      console.error("Erro ao sincronizar com o servidor:", error)
      toast({
        title: "Erro de sincronização",
        description: "Não foi possível sincronizar as permissões com o servidor.",
        variant: "destructive",
      })
    } finally {
      setSincronizando(false)
    }
  }

  const handleSalvar = async () => {
    if (!id || !canManagePermissions) return

    setSalvando(true)
    setErro(null)
    setErroDetalhado(null)

    try {
      // Converter o objeto de permissões para um array
      const permissoesArray = Object.entries(permissoesSelecionadas)
        .filter(([_, selecionada]) => selecionada)
        .map(([permissao]) => permissao)

      // Usar o método atualizado para salvar permissões
      await usuarioService.atualizarPermissoes(Number(id), permissoesArray)

      // Após salvar com sucesso, atualizar as permissões originais
      setPermissoesOriginais({ ...permissoesSelecionadas })

      toast({
        title: "Permissões atualizadas",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      })

      router.push("/usuarios")
    } catch (error: any) {
      console.error("Erro ao salvar permissões:", error)

      // Capturar mensagem de erro detalhada
      let mensagemErro = "Erro ao salvar permissões. Tente novamente."
      let detalhesErro = ""

      if (error.response) {
        mensagemErro = `Erro ${error.response.status}: ${error.response.statusText}`
        detalhesErro = JSON.stringify(error.response.data || {}, null, 2)
      } else if (error.message) {
        mensagemErro = error.message
        detalhesErro = error.stack || ""
      }

      setErro(mensagemErro)
      setErroDetalhado(detalhesErro)

      toast({
        title: "Erro",
        description: "Não foi possível atualizar as permissões do usuário.",
        variant: "destructive",
      })
    } finally {
      setSalvando(false)
    }
  }

  // Se o usuário não tem permissão para gerenciar permissões, mostrar mensagem
  if (!canManagePermissions) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Gerenciar Permissões</h1>
        </div>

        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Você não tem permissão para gerenciar permissões de usuários.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Gerenciar Permissões</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={sincronizarComServidor} disabled={sincronizando}>
            {sincronizando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sincronizando...
              </>
            ) : (
              "Sincronizar com Servidor"
            )}
          </Button>

          <Button variant="outline" onClick={() => setMostrarHistorico(!mostrarHistorico)}>
            {mostrarHistorico ? "Ocultar Histórico" : "Mostrar Histórico"}
          </Button>

          {!carregando && !erro && (
            <Button
              onClick={handleSalvar}
              disabled={salvando}
              className={temAlteracoes() ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              {salvando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : temAlteracoes() ? (
                "Salvar Alterações"
              ) : (
                "Salvar Permissões"
              )}
            </Button>
          )}
        </div>
      </div>

      {erro && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {erro}
            {erroDetalhado && (
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={() => setMostrarErroCompleto(!mostrarErroCompleto)}>
                  {mostrarErroCompleto ? "Ocultar detalhes" : "Mostrar detalhes"}
                </Button>
                {mostrarErroCompleto && (
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">{erroDetalhado}</pre>
                )}
              </div>
            )}
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setErro(null)
                setErroDetalhado(null)
                setCarregando(true)
                setTentativasCarregamento(0)
              }}
            >
              Tentar novamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {carregando ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-12 w-12 animate-spin mb-4" />
              <p className="text-lg">Carregando permissões...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {usuario && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Usuário: {usuario.nome}</CardTitle>
                <CardDescription>Username: {usuario.username}</CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Perfis de permissão */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Perfis de Permissão</CardTitle>
              <CardDescription>Selecione um perfil para aplicar um conjunto predefinido de permissões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {perfisPermissao.map((perfil) => (
                  <div key={perfil.id} className="relative group">
                    <Button variant="outline" size="sm" onClick={() => aplicarPerfil(perfil.id)} className="relative">
                      {perfil.nome}
                    </Button>
                    <div className="absolute z-50 invisible group-hover:visible bg-black text-white text-xs rounded p-2 mt-1 w-48">
                      <p>{perfil.descricao}</p>
                      <p className="text-xs mt-1">({perfil.permissoes.length} permissões)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de alterações */}
          {mostrarHistorico && historicoAlteracoes.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Histórico de Alterações</CardTitle>
                <CardDescription>Alterações feitas nesta sessão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Permissão</th>
                        <th className="text-left py-2">Alteração</th>
                        <th className="text-left py-2">Horário</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...historicoAlteracoes].reverse().map((alteracao, index) => {
                        // Encontrar o nome da permissão
                        let nomePermissao = alteracao.permissaoId
                        for (const categoria in permissoesPorCategoria) {
                          const perm = permissoesPorCategoria[categoria].find((p) => p.id === alteracao.permissaoId)
                          if (perm) {
                            nomePermissao = perm.label
                            break
                          }
                        }

                        return (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-2">{nomePermissao}</td>
                            <td className="py-2">{alteracao.valorAnterior ? "Desativada" : "Ativada"}</td>
                            <td className="py-2">{new Date(alteracao.timestamp).toLocaleTimeString()}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {Object.entries(permissoesPorCategoria).map(([categoria, listaPermissoes]) => (
            <Card key={categoria} className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>{categoria}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleCategoria(categoria, true)}
                    className="text-xs h-8"
                  >
                    Selecionar todos
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleCategoria(categoria, false)}
                    className="text-xs h-8"
                  >
                    Desmarcar todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listaPermissoes.map((permissao) => {
                    // Verificar se a permissão está selecionada
                    const isChecked = !!permissoesSelecionadas[permissao.id]
                    const isChanged = permissaoAlterada(permissao.id)

                    return (
                      <div key={permissao.id} className="flex items-center space-x-2">
                        {/* Substituir checkbox por botão estilizado como checkbox */}
                        <button
                          type="button"
                          onClick={() => handleTogglePermissao(permissao.id)}
                          className={`flex items-center justify-center w-5 h-5 rounded border ${
                            isChecked
                              ? isChanged
                                ? "bg-yellow-600 border-yellow-600"
                                : "bg-blue-600 border-blue-600"
                              : isChanged
                                ? "bg-white border-yellow-600"
                                : "bg-white border-gray-300"
                          }`}
                          aria-checked={isChecked}
                          role="checkbox"
                        >
                          {isChecked && <Check className="h-3 w-3 text-white" />}
                        </button>
                        <div className="flex items-center">
                          <label
                            onClick={() => handleTogglePermissao(permissao.id)}
                            className={`text-sm font-medium cursor-pointer ${
                              isChanged ? "text-yellow-600 font-bold" : ""
                            }`}
                          >
                            {permissao.label}
                          </label>

                          {permissao.descricao && (
                            <div className="relative group">
                              <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                              <div className="absolute z-50 invisible group-hover:visible bg-black text-white text-xs rounded p-2 mt-1 left-0 w-48">
                                <p>{permissao.descricao}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {!carregando && !erro && (
            <div className="flex justify-end mt-6 space-x-4">
              <Button variant="outline" onClick={() => router.push("/usuarios")}>
                Cancelar
              </Button>
              <Button
                onClick={handleSalvar}
                disabled={salvando}
                className={temAlteracoes() ? "bg-yellow-600 hover:bg-yellow-700" : ""}
              >
                {salvando ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : temAlteracoes() ? (
                  "Salvar Alterações"
                ) : (
                  "Salvar Permissões"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}