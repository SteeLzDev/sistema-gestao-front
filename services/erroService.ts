import toastService from "@/services/toastService"

// Tipos de erro
export enum ErrorType {
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  VALIDATION = "validation",
  SERVER = "server",
  NETWORK = "network",
  UNKNOWN = "unknown",
}

// Interface para erros padronizados
export interface StandardError {
  type: ErrorType
  message: string
  details?: string
  originalError?: any
  statusCode?: number
}

// Serviço para tratamento de erros
const errorService = {
  // Processar erro e retornar um objeto de erro padronizado
  processError: (error: any): StandardError => {
    // Erro de rede (sem conexão)
    if (error.message === "Network Error" || !error.response) {
      return {
        type: ErrorType.NETWORK,
        message: "Erro de conexão",
        details: "Não foi possível conectar ao servidor. Verifique sua conexão de internet.",
        originalError: error,
      }
    }

    // Erro com resposta do servidor
    if (error.response) {
      const { status, data } = error.response

      // Erro de autenticação (401)
      if (status === 401) {
        return {
          type: ErrorType.AUTHENTICATION,
          message: "Sessão expirada",
          details: "Sua sessão expirou. Por favor, faça login novamente.",
          statusCode: status,
          originalError: error,
        }
      }

      // Erro de autorização (403)
      if (status === 403) {
        return {
          type: ErrorType.AUTHORIZATION,
          message: "Acesso negado",
          details: "Você não tem permissão para acessar este recurso.",
          statusCode: status,
          originalError: error,
        }
      }

      // Erro de validação (400)
      if (status === 400) {
        return {
          type: ErrorType.VALIDATION,
          message: "Dados inválidos",
          details: data?.message || "Os dados fornecidos são inválidos.",
          statusCode: status,
          originalError: error,
        }
      }

      // Erro do servidor (500)
      if (status >= 500) {
        return {
          type: ErrorType.SERVER,
          message: "Erro no servidor",
          details: data?.message || "Ocorreu um erro no servidor. Tente novamente mais tarde.",
          statusCode: status,
          originalError: error,
        }
      }

      // Outros erros HTTP
      return {
        type: ErrorType.UNKNOWN,
        message: "Erro desconhecido",
        details: data?.message || `Erro ${status}: ${error.message}`,
        statusCode: status,
        originalError: error,
      }
    }

    // Erro genérico
    return {
      type: ErrorType.UNKNOWN,
      message: "Erro desconhecido",
      details: error.message || "Ocorreu um erro inesperado.",
      originalError: error,
    }
  },

  // Tratar erro e mostrar toast apropriado
  handleError: (error: any, customMessage?: string): StandardError => {
    const standardError = errorService.processError(error)

    // Log do erro para depuração
    console.error("Erro capturado:", standardError)

    // Mostrar toast com mensagem de erro
    toastService.error(customMessage || standardError.message, standardError.details)

    // Redirecionar para login se for erro de autenticação
    if (standardError.type === ErrorType.AUTHENTICATION && typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }

    return standardError
  },

  // Tratar erro silenciosamente (sem toast)
  handleErrorSilently: (error: any): StandardError => {
    const standardError = errorService.processError(error)
    console.error("Erro capturado (silencioso):", standardError)
    return standardError
  },

  // Verificar se é um erro de autenticação
  isAuthenticationError: (error: any): boolean => {
    return error?.response?.status === 401
  },

  // Verificar se é um erro de autorização
  isAuthorizationError: (error: any): boolean => {
    return error?.response?.status === 403
  },

  // Verificar se é um erro de rede
  isNetworkError: (error: any): boolean => {
    return error.message === "Network Error" || !error.response
  },
}

export default errorService
