import axios from "axios"
import toastService from "./toastService"
import { url } from "inspector"

// Criar uma instância do axios com configurações padrão
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout de 10 segundos
})

// Controle de renovação de token
let isRefreshingToken = false
let refreshTokenPromise: Promise<boolean> | null = null
let failedRequests: Array<{
  resolve: (value: any) => void
  reject: (error: any) => void
  config: any
}> = []

// Função para processar requisições que falharam após renovação de token
const processFailedRequests = (success: boolean) => {
  failedRequests.forEach((request) => {
    if (success) {
      // Adicionar token atualizado ao cabeçalho
      const token = localStorage.getItem("token")
      if (token) {
        request.config.headers.Authorization = `Bearer ${token}`
      }

      // Tentar novamente a requisição
      axios(request.config)
        .then((response) => request.resolve(response))
        .catch((error) => request.reject(error))
    } else {
      // Se a renovação falhou, rejeitar todas as requisições
      request.reject(new Error("Falha na renovação do token"))
    }
  })

  // Limpar a lista de requisições pendentes
  failedRequests = []
}

// Função para renovar o token
const refreshToken = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("token")
  if (!token) {
    console.warn("Não há token para renovar")
    return false
  }

  try {
    console.log("Tentando renovar token...")

    // Usar o endpoint /api/auth/refresh para renovar o token
    const response = await axios.get("/auth/refresh", {
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao/api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200 && response.data && response.data.token) {
      console.log("Token renovado com sucesso")

      // Atualizar token no localStorage
      localStorage.setItem("token", response.data.token)

      // Atualizar usuário no localStorage se disponível
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }

      return true
    }

    console.warn("Resposta de renovação de token não contém token")
    return false
  } catch (error) {
    console.error("Erro ao renovar token:", error)
    return false
  }
}

// Interceptor de requisição para adicionar o token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // Log para depuração
    console.log(`Enviando requisição para: ${config.method?.toUpperCase()} ${config.url}`)

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de resposta para tratar erros de autenticação
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `Resposta recebida: ${response.config.method?.toLocaleUpperCase()} ${response.config.url} - Status: ${response.status}`,
    )
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Verificar se é um erro de autenticação (401) e se não estamos já tentando renovar o token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Se já estamos renovando o token, adicionar esta requisição à lista de pendentes
      if (isRefreshingToken) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject, config: originalRequest })
        })
      }

      // Iniciar processo de renovação de token
      isRefreshingToken = true

      try {
        // Tentar renovar o token
        refreshTokenPromise = refreshToken()
        const success = await refreshTokenPromise

        // Processar requisições pendentes
        processFailedRequests(success)

        if (success) {
          // Se a renovação foi bem-sucedida, tentar novamente a requisição original
          const token = localStorage.getItem("token")
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return axios(originalRequest)
        } else {
          // Se a renovação falhou, redirecionar para login
          console.warn("Não foi possível renovar o token. Redirecionando para login...")

          // Mostrar mensagem ao usuário
          toastService.error("Sessão expirada", "Sua sessão expirou. Por favor, faça login novamente.")

          // Limpar dados de autenticação
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          }

          // Redirecionar para login após um breve delay
          setTimeout(() => {
            window.location.href = "/login"
          }, 1000)

          return Promise.reject(new Error("Sessão expirada"))
        }
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError)

        // Mostrar mensagem ao usuário
        toastService.error(
          "Erro de autenticação",
          "Ocorreu um erro ao verificar sua autenticação. Por favor, faça login novamente.",
        )

        // Limpar dados de autenticação
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }

        // Redirecionar para login após um breve delay
        setTimeout(() => {
          window.location.href = "/login"
        }, 1000)

        return Promise.reject(refreshError)
      } finally {
        isRefreshingToken = false
        refreshTokenPromise = null
      }
    }

    // Se for um erro 403 (Forbidden), mostrar mensagem apropriada
    if (error.response?.status === 403) {
      toastService.error("Acesso negado", "Você não tem permissão para acessar este recurso.")
    }

    // Se for um erro de rede, mostrar mensagem apropriada
    if (error.code === "ECONNABORTED" || !error.response) {
      toastService.error("Erro de conexão", "Não foi possível conectar ao servidor. Verifique sua conexão.")
    }

    //Log detalhado do erro para depuração
    console.error("Erro na requisição API:", {
      url: error.config.url,
      method: error.config?.method,
      status: error.response?.data,
      message: error.message,
    })

    console.error("Detalhes completos do erro:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.data,
      message: error.message,
    })

    return Promise.reject(error)
  },
)

export default apiClient
