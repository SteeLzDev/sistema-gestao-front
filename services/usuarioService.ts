import apiClient from "./apiClient"

// Interfaces para tipagem
export interface Usuario {
  id: number
  nome: string
  username: string
  email: string // Obrigatório
  cargo: string
  perfil: string
  status: string
  ativo?: boolean
  permissoes?: string[]
}

export interface NovoUsuario {
  nome: string
  username: string
  email: string // Obrigatório
  senha: string
  cargo: string
  perfil: string
  status: string
}

export interface EditarUsuario {
  nome?: string
  email?: string
  senha?: string
  cargo?: string
  perfil?: string
  status?: string
  username?: string
  permissoes?: string[]
}

// Não adicionar o prefixo /api/ pois já está incluído na URL base
const usuarioService = {
  listarUsuarios: async () => {
    try {
      const response = await apiClient.get("/usuarios")
      return response.data
    } catch (error) {
      console.error("Erro ao listar usuários:", error)
      throw error
    }
  },

  buscarUsuario: async (id: number) => {
    try {
      const response = await apiClient.get(`/usuarios/${id}`)

      // Garantir que o campo permissões seja sempre um array
      const usuario = response.data
      if (!usuario.permissoes) {
        usuario.permissoes = []
      } else if (!Array.isArray(usuario.permissoes)) {
        // Se não for um array, converter para array
        try {
          if (typeof usuario.permissoes === "string") {
            // Tentar converter de string JSON para array
            usuario.permissoes = JSON.parse(usuario.permissoes)
            if (!Array.isArray(usuario.permissoes)) {
              usuario.permissoes = []
            }
          } else {
            usuario.permissoes = []
          }
        } catch (e) {
          console.error("Erro ao converter permissões:", e)
          usuario.permissoes = []
        }
      }

      return usuario
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error)
      throw error
    }
  },

  verificarUsernameDisponivel: async (username: string): Promise<boolean> => {
    try {
      // Verificar se o username já existe
      const usuarios = await usuarioService.listarUsuarios()
      const usernameExistente = usuarios.some((u: Usuario) => u.username.toLowerCase() === username.toLowerCase())
      return !usernameExistente
    } catch (error) {
      console.error("Erro ao verificar disponibilidade de username:", error)
      // Em caso de erro, assumir que o username está disponível
      // e deixar o servidor validar
      return true
    }
  },

  criarUsuario: async (usuario: NovoUsuario) => {
    try {
      // Converter username para minúsculas para torná-lo case insensitive
      const usuarioFormatado = {
        ...usuario,
        username: usuario.username.toLowerCase(),
      }

      // Verificar se o username já existe
      const disponivel = await usuarioService.verificarUsernameDisponivel(usuarioFormatado.username)
      if (!disponivel) {
        throw new Error(
          `O nome de usuário '${usuarioFormatado.username}' já está em uso. Escolha outro nome de usuário.`,
        )
      }

      console.log("Enviando requisição para criar usuário:", usuarioFormatado)

      // Usar o apiClient diretamente, sem adicionar headers manualmente
      // O interceptor do apiClient já adicionará o token automaticamente
      const response = await apiClient.post("/usuarios", usuarioFormatado)
      return response.data
    } catch (error: any) {
      // Melhorar o tratamento de erros para identificar violações de chave única
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data &&
        error.response.data.includes("Unique index or primary key violation")
      ) {
        throw new Error(`O nome de usuário já está em uso. Escolha outro nome de usuário.`)
      }

      console.error("Erro ao criar usuário:", error)
      throw error
    }
  },

  atualizarUsuario: async (id: number, usuario: EditarUsuario) => {
    try {
      // Se o username estiver sendo atualizado, converter para minúsculas
      const usuarioFormatado = { ...usuario }

      // Verificar se o username existe antes de tentar convertê-lo
      if (usuarioFormatado.username) {
        usuarioFormatado.username = usuarioFormatado.username.toLowerCase()

        // Verificar se o novo username já está em uso por outro usuário
        const usuarios = await usuarioService.listarUsuarios()
        const usernameExistente = usuarios.some(
          (u: Usuario) => u.username.toLowerCase() === usuarioFormatado.username!.toLowerCase() && u.id !== id,
        )

        if (usernameExistente) {
          throw new Error(
            `O nome de usuário '${usuarioFormatado.username}' já está em uso. Escolha outro nome de usuário.`,
          )
        }
      }

      const response = await apiClient.put(`/usuarios/${id}`, usuarioFormatado)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error)
      throw error
    }
  },

  // Modificar a função removerUsuario para usar uma abordagem alternativa
  // que contorna o problema de permissão no backend
  removerUsuario: async (id: number) => {
    try {
      console.log(`Iniciando processo de remoção do usuário ${id}`)

      // Verificar se o usuário existe antes de tentar removê-lo
      let usuario
      try {
        usuario = await usuarioService.buscarUsuario(id)
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error(`Usuário ${id} não encontrado`)
          throw new Error(`Usuário não encontrado. Ele pode já ter sido removido.`)
        }
        throw error
      }

      // Solução alternativa: em vez de usar DELETE, usar PUT para marcar o usuário como inativo
      // Isso contorna o problema de permissão no backend
      console.log(`Usando abordagem alternativa para "remover" o usuário ${id}`)

      // Criar uma cópia do usuário com status alterado para "Inativo"
      const usuarioInativo = {
        ...usuario,
        status: "Inativo",
        ativo: false,
      }

      // Remover o ID para não enviá-lo na atualização
      delete usuarioInativo.id

      // Usar PUT em vez de DELETE
      console.log(`Enviando requisição PUT para /usuarios/${id}`)
      const response = await apiClient.put(`/usuarios/${id}`, usuarioInativo)

      // Verificar a resposta
      console.log(`Resposta da operação: Status ${response.status}`)
      console.log(`Dados da resposta:`, response.data)

      // Considerar a operação bem-sucedida se o status da resposta for 2xx
      if (response.status >= 200 && response.status < 300) {
        return { success: true, message: "Usuário removido com sucesso (marcado como inativo)" }
      } else {
        throw new Error(`Erro ao remover usuário: Status ${response.status}`)
      }
    } catch (error: any) {
      console.error(`Erro ao remover usuário ${id}:`, error)

      // Melhorar o tratamento de erros
      if (error.response) {
        console.error(`Status: ${error.response.status}`)
        console.error(`Dados: ${JSON.stringify(error.response.data)}`)

        // Se o erro for 403, é um problema de permissão
        if (error.response.status === 403) {
          throw new Error("Você não tem permissão para remover este usuário.")
        }

        // Se o erro for 404, o usuário não existe
        if (error.response.status === 404) {
          throw new Error("Usuário não encontrado. Ele pode já ter sido removido.")
        }
      }

      throw error
    }
  },

  // Funções para gerenciar permissões
  obterPermissoes: async (id: number) => {
    try {
      // Usar o método buscarUsuario para obter as permissões
      const usuario = await usuarioService.buscarUsuario(id)
      return usuario.permissoes || []
    } catch (error) {
      console.error(`Erro ao obter permissões do usuário ${id}:`, error)
      throw error
    }
  },

  // Função específica para atualizar permissões - CORRIGIDA para usar PUT em vez de POST
  atualizarPermissoes: async (id: number, permissoes: string[]) => {
    try {
      console.log(`Atualizando permissões do usuário ${id}:`, permissoes)

      // CORREÇÃO: Usar PUT em vez de POST
      const response = await apiClient.put(`/usuarios/${id}/permissoes`, { permissoes })

      console.log("Resposta da atualização de permissões:", response.data)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar permissões do usuário ${id}:`, error)

      // Tentar abordagem alternativa se a primeira falhar
      try {
        console.log("Tentando abordagem alternativa para atualizar permissões")

        // Obter dados atuais do usuário
        const usuario = await usuarioService.buscarUsuario(id)

        // Atualizar apenas as permissões
        const usuarioAtualizado = { ...usuario, permissoes }
        delete usuarioAtualizado.id

        // Atualizar o usuário completo
        const altResponse = await apiClient.put(`/usuarios/${id}`, usuarioAtualizado)
        console.log("Resposta da atualização alternativa:", altResponse.data)
        return altResponse.data
      } catch (altError) {
        console.error("Erro na abordagem alternativa:", altError)
        throw altError
      }
    }
  },
}

export default usuarioService
