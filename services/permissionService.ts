import apiClient from "./apiClient"
import usuarioService from "./usuarioService"
import authService from "./authService"

// Interface para o DTO de permissão
interface PermissaoDTO {
  id: number
  nome: string
  descricao: string
  selecionada: boolean
}

// Interface para o DTO de usuário com permissões
interface UsuarioPermissoesDTO {
  id: number
  nome: string
  perfil: string
  permissoes: PermissaoDTO[]
}

// Interface para o DTO de atribuição de perfil
interface AtribuirPerfilDTO {
  usuarioId: number
  perfil: string
}

// Lista de permissões por perfil
const permissoesPorPerfil = {
  ADMINISTRADOR: [
    "USUARIOS_VISUALIZAR",
    "USUARIOS_CRIAR",
    "USUARIOS_EDITAR",
    "USUARIOS_REMOVER",
    "USUARIOS_PERMISSOES",
    "ESTOQUE_VISUALIZAR",
    "ESTOQUE_ADICIONAR",
    "ESTOQUE_EDITAR",
    "ESTOQUE_REMOVER",
    "VENDAS_VISUALIZAR",
    "VENDAS_CRIAR",
    "VENDAS_CANCELAR",
    "FILA_VISUALIZAR",
    "FILA_GERENCIAR",
    "CONFIGURACOES_VISUALIZAR",
    "CONFIGURACOES_EDITAR",
    "RELATORIOS_VISUALIZAR",
    "RELATORIOS_EXPORTAR",
  ],
  GERENTE: [
    "USUARIOS_VISUALIZAR",
    "ESTOQUE_VISUALIZAR",
    "ESTOQUE_CRIAR",
    "ESTOQUE_EDITAR",
    "VENDAS_VISUALIZAR",
    "VENDAS_CRIAR",
    "VENDAS_EDITAR",
    "RELATORIOS_VISUALIZAR",
    "RELATORIOS_GERAR",
    "FILA_VISUALIZAR",
    "FILA_GERENCIAR",
  ],
  VENDEDOR: ["ESTOQUE_VISUALIZAR", "VENDAS_VISUALIZAR", "VENDAS_CRIAR", "FILA_VISUALIZAR", "FILA_GERENCIAR"],
  OPERADOR: ["ESTOQUE_VISUALIZAR", "FILA_VISUALIZAR"],
}

// Serviço para gerenciar permissões de usuários
const permissionService = {
  // Listar todas as permissões disponíveis
  listarTodasPermissoes: async (): Promise<PermissaoDTO[]> => {
    try {
      // Tentar renovar o token antes de fazer a requisição
      await authService.refreshToken()

      const response = await apiClient.get("/permissoes")
      return response.data
    } catch (error) {
      console.error("Erro ao listar permissões:", error)
      throw error
    }
  },

  // Obter as permissões de um usuário específico
  obterPermissoesDoUsuario: async (usuarioId: number): Promise<UsuarioPermissoesDTO> => {
    try {
      // Tentar renovar o token antes de fazer a requisição
      await authService.refreshToken()

      const response = await apiClient.get(`/usuarios/${usuarioId}/permissoes`)
      return response.data
    } catch (error) {
      console.error(`Erro ao obter permissões do usuário ${usuarioId}:`, error)
      throw error
    }
  },

  // Atualizar as permissões de um usuário
  atualizarPermissoesDoUsuario: async (usuarioId: number, permissaoIds: number[]): Promise<void> => {
    try {
      // Tentar renovar o token antes de fazer a requisição
      await authService.refreshToken()

      console.log(`Atualizando permissões do usuário ${usuarioId}:`, permissaoIds)

      // Importante: enviar apenas o array de IDs, não um objeto
      await apiClient.put(`/usuarios/${usuarioId}/permissoes`, permissaoIds, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(`Erro ao atualizar permissões do usuário ${usuarioId}:`, error)
      throw error
    }
  },

  // Atribuir um perfil a um usuário (e suas permissões associadas)
  atribuirPerfilUsuario: async (usuarioId: number, perfil: string): Promise<void> => {
    try {
      // Tentar renovar o token antes de fazer a requisição
      await authService.refreshToken()

      console.log(`Atribuindo perfil ${perfil} ao usuário ${usuarioId}`)

      // Usar o endpoint específico para atribuir perfil
      const data: AtribuirPerfilDTO = {
        usuarioId,
        perfil,
      }

      // Chamar o endpoint correto para atribuir perfil
      await apiClient.post("/permissoes/atribuir-perfil", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Perfil atribuído com sucesso")

      // Atualizar o localStorage se o usuário atual for o mesmo que está sendo atualizado
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser)
            if (user.id === usuarioId) {
              user.perfil = perfil
              localStorage.setItem("user", JSON.stringify(user))
            }
          } catch (e) {
            console.error("Erro ao atualizar perfil no localStorage:", e)
          }
        }
      }
    } catch (error: any) {
      console.error(`Erro ao atribuir perfil ao usuário ${usuarioId}:`, error)
      console.error("Detalhes da resposta:", error.response?.data)
      throw error
    }
  },

  // Verificar se um usuário tem uma permissão específica
  verificarPermissao: async (usuarioId: number, nomePermissao: string): Promise<boolean> => {
    try {
      // Tentar renovar o token antes de fazer a requisição
      await authService.refreshToken()

      const response = await apiClient.get(`/usuarios/${usuarioId}/permissoes/verificar?nome=${nomePermissao}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao verificar permissão ${nomePermissao} para o usuário ${usuarioId}:`, error)
      return false
    }
  },

  // Adicionar permissão VENDA_VISUALIZAR ao usuário atual
  addVendaVisualizarPermission: async (): Promise<boolean> => {
    try {
      // Obter usuário atual do localStorage
      const userStr = localStorage.getItem("user")
      if (!userStr) {
        console.error("Usuário não encontrado no localStorage")
        return false
      }

      const user = JSON.parse(userStr)

      // Verificar se o usuário já tem a permissão
      if (user.permissoes && user.permissoes.includes("VENDA_VISUALIZAR")) {
        console.log("Usuário já possui a permissão VENDA_VISUALIZAR")
        return true
      }

      // Adicionar a permissão VENDA_VISUALIZAR
      const updatedPermissions = [...user.permissoes, "VENDA_VISUALIZAR"]

      // Atualizar o usuário no localStorage
      user.permissoes = updatedPermissions
      localStorage.setItem("user", JSON.stringify(user))

      console.log("Permissão VENDA_VISUALIZAR adicionada com sucesso")
      return true
    } catch (error) {
      console.error("Erro ao adicionar permissão VENDA_VISUALIZAR:", error)
      return false
    }
  },

  // Obter permissões de um usuário
  getUserPermissions: async (userId: number): Promise<string[]> => {
    try {
      // Tentar obter permissões do usuário específico
      const response = await apiClient.get(`/usuarios/${userId}/permissoes`)
      return response.data
    } catch (error) {
      console.error("Erro ao obter permissões do usuário:", error)

      // Tentar obter permissões do usuário logado como fallback
      try {
        const userResponse = await apiClient.get("/auth/me")
        return userResponse.data.permissoes || []
      } catch (innerError) {
        console.error("Erro ao obter permissões do usuário logado:", innerError)

        // Se não conseguir obter do backend, tentar obter do localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser)
              return user.permissoes || []
            } catch (e) {
              console.error("Erro ao parsear usuário do localStorage:", e)
            }
          }
        }

        return []
      }
    }
  },

  // Atualizar permissões de um usuário
  updateUserPermissions: async (userId: number, permissions: string[]): Promise<void> => {
    await apiClient.put(`/usuarios/${userId}/permissoes`, { permissoes: permissions })
  },

  // Atribuir permissões padrão com base no perfil
  atribuirPermissoesPorPerfil: async (usuarioId: number, perfil: string): Promise<void> => {
    try {
      console.log(`Atribuindo permissões padrão para o perfil ${perfil} ao usuário ${usuarioId}`)

      // Obter permissões padrão para o perfil
      const permissoesPadrao = permissoesPorPerfil[perfil as keyof typeof permissoesPorPerfil] || []

      if (permissoesPadrao.length === 0) {
        console.warn(`Não há permissões padrão definidas para o perfil ${perfil}`)
        return
      }

      console.log(`Permissões a serem atribuídas: ${permissoesPadrao.join(", ")}`)

      // Atualizar permissões do usuário
      await usuarioService.atualizarPermissoes(usuarioId, permissoesPadrao)

      console.log(`Permissões padrão atribuídas com sucesso ao usuário ${usuarioId}`)
    } catch (error) {
      console.error(`Erro ao atribuir permissões padrão para o perfil ${perfil}:`, error)
      throw error
    }
  },
}

export default permissionService
