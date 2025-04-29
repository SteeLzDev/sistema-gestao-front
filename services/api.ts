import axios from "axios"

// Function to check if we're in the browser
const isBrowser = () => typeof window !== "undefined"

// URL base com o contexto correto
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"
console.log("API Base URL:", API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    console.log(`[API] Enviando requisição para: ${config.method?.toUpperCase()} ${config.url}`)

    // Add authentication token if available
    if (isBrowser()) {
      // Verificar em localStorage primeiro (onde o token é armazenado após login)
      const token = localStorage.getItem("token")

      if (token) {
        console.log("[API] Token encontrado:", token.substring(0, 10) + "...")

        // Garantir que o token esteja no formato correto
        config.headers.Authorization = `Bearer ${token.trim()}`
        console.log("[API] Cabeçalho Authorization configurado:", config.headers.Authorization.substring(0, 20) + "...")
      } else {
        console.warn("[API] Token não encontrado!")

        // Se não houver token e a rota não for de autenticação, redirecionar para login
        if (!config.url?.includes("/auth/login")) {
          console.warn("[API] Token não encontrado para requisição:", config.url)
          // Não redirecionamos aqui para evitar o loop infinito
          // Apenas logamos o erro e deixamos a requisição continuar
        }
      }
    }

    return config
  },
  (error) => {
    console.error("[API] Erro no interceptor de requisição:", error)
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Resposta recebida: ${response.status} ${response.statusText}`)
    return response
  },
  (error) => {
    console.error("[API] Erro na resposta:", error.message)

    if (error.response) {
      console.error(`[API] Status: ${error.response.status}`)
      console.error(`[API] Dados: ${JSON.stringify(error.response.data)}`)
    }

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.warn("[API] Erro 401: Não autorizado")

      // Não redirecionamos automaticamente para evitar loops
      // Apenas logamos o erro e deixamos o componente tratar
    }
    // Handle 403 Forbidden errors
    else if (error.response && error.response.status === 403) {
      console.warn("[API] Erro 403: Acesso negado")

      // Não redirecionamos automaticamente para evitar loops
      // Apenas logamos o erro e deixamos o componente tratar
    }

    return Promise.reject(error)
  },
)

export default api
