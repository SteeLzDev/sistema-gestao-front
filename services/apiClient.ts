// src/services/apiClient.ts
import axios from "axios"

// Function to check if we're in the browser
const isBrowser = () => typeof window !== "undefined"

// URL base com o contexto correto
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/sistema-gestao"
console.log("API Base URL:", API_BASE_URL)

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Enviando requisição para: ${config.method?.toUpperCase()} ${config.url}`)
    
    // Add authentication token if available
    if (isBrowser()) {
      // Usar localStorage em vez de sessionStorage para consistência com authService
      const token = localStorage.getItem("token")

      if (token) {
        console.log("Token encontrado em localStorage:", token.substring(0, 10) + "...")
        
        // Garantir que o token esteja no formato correto
        config.headers.Authorization = `Bearer ${token.trim()}`
        console.log("Cabeçalho Authorization configurado:", config.headers.Authorization.substring(0, 20) + "...")
      } else {
        console.warn("Token não encontrado em localStorage!")
        
        // Verificar se há outros itens em localStorage
        if (isBrowser() && window.localStorage) {
          console.log("Itens em localStorage:", Object.keys(localStorage))
        }
      }
    }
    
    return config
  },
  (error) => {
    console.error("Erro no interceptor de requisição:", error)
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Resposta recebida: ${response.status} ${response.statusText}`)
    return response
  },
  (error) => {
    console.error("Erro na resposta:", error.message)
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`)
      console.error(`Dados: ${JSON.stringify(error.response.data)}`)
    }
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.warn("Erro 401: Não autorizado - Redirecionando para login")
      
      // Clear auth data and redirect to login if in browser
      if (isBrowser()) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
      }
    }
    // Handle 403 Forbidden errors
    else if (error.response && error.response.status === 403) {
      console.warn("Erro 403: Acesso negado - Redirecionando para página de acesso negado")
      
      // Redirecionar para página de acesso negado
      if (isBrowser()) {
        window.location.href = "/acesso-negado"
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient