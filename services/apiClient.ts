import axios, { type AxiosInstance } from "axios"

// Estender a interface AxiosInstance para incluir nossas propriedades personalizadas
interface CustomAxiosInstance extends AxiosInstance {
  verificarToken: () => boolean
  // Corrigir o tipo de retorno para permitir um objeto vazio
  getAuthHeader: () => { Authorization?: string }
  disableAutoRedirect?: () => void
  enableAutoRedirect?: () => void
  renovarToken: () => Promise<boolean>
  silentRequest: (config: any) => Promise<any>
}

// URL base com o contexto correto
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"
console.log("API Base URL:", API_BASE_URL)

// Criar uma instância do axios sem interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance

// Adicionar função para verificar token (para compatibilidade)
apiClient.verificarToken = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    console.warn("Token não encontrado no localStorage")
    return false
  }

  // Verificar se o token é válido (pelo menos não está vazio)
  if (token.trim() === "") {
    console.error("Token vazio encontrado, removendo...")
    localStorage.removeItem("token")
    return false
  }

  return true
}

// Função para obter o token atual - corrigida para corresponder ao tipo
apiClient.getAuthHeader = () => {
  const token = localStorage.getItem("token")

  // Verificar se o token é válido (pelo menos não está vazio)
  if (!token || token.trim() === "") {
    console.warn("Token inválido ou vazio encontrado em getAuthHeader")
    return {}
  }

  return { Authorization: `Bearer ${token}` }
}

// Adicionar request interceptor para incluir o token automaticamente
apiClient.interceptors.request.use(
  (config) => {
    // Não logar se for uma requisição silenciosa
    if (!config.silent) {
      console.log(`[API] Enviando requisição para: ${config.method?.toUpperCase()} ${config.url}`)
    }

    // Add authentication token if available
    const token = localStorage.getItem("token")
    if (token && token.trim() !== "") {
      if (!config.silent) {
        console.log("[API] Token encontrado:", token.substring(0, 10) + "...")
      }
      config.headers.Authorization = `Bearer ${token.trim()}`

      // Adicionar cabeçalhos para depuração CORS
      config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
      config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    } else if (!config.silent) {
      console.warn("[API] Token não encontrado ou vazio!")

      // Se o token estiver vazio, removê-lo
      if (token && token.trim() === "") {
        console.error("[API] Token vazio encontrado, removendo...")
        localStorage.removeItem("token")
      }
    }

    return config
  },
  (error) => {
    if (!error.config?.silent) {
      console.error("[API] Erro no interceptor de requisição:", error)
    }
    return Promise.reject(error)
  },
)

// Função para fazer requisições silenciosas (sem logs)
apiClient.silentRequest = async (config) => {
  try {
    return await apiClient({
      ...config,
      silent: true,
    })
  } catch (error) {
    // Não logar erros para requisições silenciosas
    return Promise.reject(error)
  }
}

// Função para renovar o token automaticamente
apiClient.renovarToken = async (): Promise<boolean> => {
  try {
    // Verificar se há um token atual
    const tokenAtual = localStorage.getItem("token")
    if (!tokenAtual || tokenAtual.trim() === "") {
      console.error("[API] Não há token válido para renovar")

      // Remover token inválido
      if (tokenAtual && tokenAtual.trim() === "") {
        localStorage.removeItem("token")
      }

      return false
    }

    // Verificar se há um usuário atual
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      console.error("[API] Não há usuário para renovar token")
      return false
    }

    const user = JSON.parse(userStr)

    // Fazer uma requisição para verificar e renovar o token
    try {
      // Corrigir a URL para evitar duplicação de /api/
      // Usar requisição silenciosa para evitar logs de erro
      const response = await apiClient.silentRequest({
        method: "get",
        url: "/auth/refresh",
        headers: {
          Authorization: `Bearer ${tokenAtual}`,
        },
      })

      // Se a requisição for bem-sucedida e retornar um novo token
      if (response.data && response.data.token) {
        // Verificar se o token é válido
        if (response.data.token.trim() === "") {
          console.error("[API] Token vazio recebido do servidor")
          return false
        }

        // Atualizar o token no localStorage
        localStorage.setItem("token", response.data.token)
        console.log("[API] Token renovado com sucesso")

        // Atualizar o token no objeto do usuário
        user.token = response.data.token
        localStorage.setItem("user", JSON.stringify(user))

        return true
      }

      // Se não retornar um novo token, mas a requisição for bem-sucedida
      // significa que o token atual ainda é válido
      console.log("[API] Token atual ainda é válido")
      return true
    } catch (error: any) {
      // Não logar o erro completo para evitar poluição do console
      console.warn("[API] Não foi possível renovar o token")

      // Se o erro for 401, o token está inválido e deve ser removido
      if (error.response && error.response.status === 401) {
        console.error("[API] Token inválido (401), removendo token do localStorage")
        localStorage.removeItem("token")

        // Não redirecionar automaticamente para evitar loops
        return false
      }

      return false
    }
  } catch (error) {
    console.error("[API] Erro ao renovar token")
    return false
  }
}

// Modificar o interceptor de resposta para tentar renovar o token em caso de erro 401
apiClient.interceptors.response.use(
  (response) => {
    // Não logar se for uma requisição silenciosa
    if (!response.config.silent) {
      console.log(`[API] Resposta recebida: ${response.status} ${response.statusText}`)
    }
    return response
  },
  async (error) => {
    // Não logar se for uma requisição silenciosa
    if (!error.config?.silent) {
      console.error("[API] Erro na resposta:", error.message)

      if (error.response) {
        console.error(`[API] Status: ${error.response.status}`)
        if (error.response.data) {
          console.error(`[API] Dados: ${JSON.stringify(error.response.data)}`)
        }
      }
    }

    // Tentar renovar o token em caso de erro 401
    if (error.response && error.response.status === 401) {
      // Não logar se for uma requisição silenciosa
      if (!error.config?.silent) {
        console.warn("[API] Erro 401: Não autorizado. Tentando renovar token...")
      }

      const tokenRenovado = await apiClient.renovarToken()

      if (tokenRenovado) {
        // Se o token foi renovado com sucesso, tentar a requisição novamente
        if (!error.config?.silent) {
          console.log("[API] Token renovado, tentando requisição novamente...")
        }

        // Obter o novo token
        const novoToken = localStorage.getItem("token")

        // Verificar se o token é válido
        if (!novoToken || novoToken.trim() === "") {
          console.error("[API] Novo token inválido ou vazio")
          return Promise.reject(error)
        }

        // Configurar o cabeçalho de autorização com o novo token
        error.config.headers.Authorization = `Bearer ${novoToken}`

        // Tentar a requisição novamente
        return apiClient(error.config)
      } else {
        // Se não foi possível renovar o token, limpar o token inválido
        localStorage.removeItem("token")

        // Propagar o erro para que a página possa redirecionar para login
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
