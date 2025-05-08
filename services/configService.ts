
import cacheService from "./cacheServices"
import toastService from "./toastService"

// Prefixos para o cache
const CONFIG_CACHE_PREFIX = "config:"
const GENERAL_CONFIG_KEY = `${CONFIG_CACHE_PREFIX}general`
const DATABASE_CONFIG_KEY = `${CONFIG_CACHE_PREFIX}database`
const NOTIFICATION_CONFIG_KEY = `${CONFIG_CACHE_PREFIX}notification`
const SECURITY_CONFIG_KEY = `${CONFIG_CACHE_PREFIX}security`

// Interfaces para os tipos de configuração
export interface GeneralConfig {
  companyName: string
  address: string
  phone: string
  email: string
  darkMode: boolean
}

export interface DatabaseConfig {
  host: string
  port: string
  database: string
  username: string
  password: string
}

export interface NotificationConfig {
  lowStockAlerts: boolean
  salesReports: boolean
  loginAlerts: boolean
  emailNotifications: boolean
}

export interface SecurityConfig {
  sessionTimeout: number
  loginAttempts: number
  twoFactorAuth: boolean
  strongPasswordPolicy: boolean
}

// Valores padrão
const defaultGeneralConfig: GeneralConfig = {
  companyName: "Oficina Mecânica",
  address: "Rua Exemplo, 123 - Centro",
  phone: "(11) 1234-5678",
  email: "contato@oficina.com",
  darkMode: false,
}

const defaultDatabaseConfig: DatabaseConfig = {
  host: "localhost",
  port: "5432",
  database: "sistema_gestao",
  username: "postgres",
  password: "",
}

const defaultNotificationConfig: NotificationConfig = {
  lowStockAlerts: true,
  salesReports: true,
  loginAlerts: false,
  emailNotifications: false,
}

const defaultSecurityConfig: SecurityConfig = {
  sessionTimeout: 30,
  loginAttempts: 3,
  twoFactorAuth: false,
  strongPasswordPolicy: true,
}

// Serviço de configuração
const configService = {
  // Carregar configurações gerais
  loadGeneralConfig: (): GeneralConfig => {
    return cacheService.get<GeneralConfig>(GENERAL_CONFIG_KEY) || defaultGeneralConfig
  },

  // Salvar configurações gerais
  saveGeneralConfig: async (config: GeneralConfig): Promise<boolean> => {
    try {
      cacheService.set(GENERAL_CONFIG_KEY, config)
      return true
    } catch (error) {
      console.error("Erro ao salvar configurações gerais:", error)
      return false
    }
  },

  // Carregar configurações de banco de dados
  loadDatabaseConfig: (): DatabaseConfig => {
    return cacheService.get<DatabaseConfig>(DATABASE_CONFIG_KEY) || defaultDatabaseConfig
  },

  // Salvar configurações de banco de dados
  saveDatabaseConfig: async (config: DatabaseConfig): Promise<boolean> => {
    try {
      cacheService.set(DATABASE_CONFIG_KEY, config)
      return true
    } catch (error) {
      console.error("Erro ao salvar configurações de banco de dados:", error)
      return false
    }
  },

  // Testar conexão com o banco de dados
  testDatabaseConnection: async (config: DatabaseConfig): Promise<boolean> => {
    try {
      // Simulando um teste de conexão
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulando sucesso (em um ambiente real, isso faria uma conexão real)
      const success = true

      if (success) {
        toastService.success("Conexão bem-sucedida", "A conexão com o banco de dados foi estabelecida com sucesso.")
        return true
      } else {
        toastService.error(
          "Falha na conexão",
          "Não foi possível conectar ao banco de dados. Verifique as configurações.",
        )
        return false
      }
    } catch (error) {
      console.error("Erro ao testar conexão:", error)
      toastService.error("Erro de conexão", "Ocorreu um erro ao tentar conectar ao banco de dados.")
      return false
    }
  },

  // Carregar configurações de notificações
  loadNotificationConfig: (): NotificationConfig => {
    return cacheService.get<NotificationConfig>(NOTIFICATION_CONFIG_KEY) || defaultNotificationConfig
  },

  // Salvar configurações de notificações
  saveNotificationConfig: async (config: NotificationConfig): Promise<boolean> => {
    try {
      cacheService.set(NOTIFICATION_CONFIG_KEY, config)
      return true
    } catch (error) {
      console.error("Erro ao salvar configurações de notificações:", error)
      return false
    }
  },

  // Carregar configurações de segurança
  loadSecurityConfig: (): SecurityConfig => {
    return cacheService.get<SecurityConfig>(SECURITY_CONFIG_KEY) || defaultSecurityConfig
  },

  // Salvar configurações de segurança
  saveSecurityConfig: async (config: SecurityConfig): Promise<boolean> => {
    try {
      cacheService.set(SECURITY_CONFIG_KEY, config)
      return true
    } catch (error) {
      console.error("Erro ao salvar configurações de segurança:", error)
      return false
    }
  },

  // Detectar se o modo escuro deve ser ativado
  detectDarkMode: (): boolean => {
    // Verificar se há uma preferência salva
    const savedConfig = cacheService.get<GeneralConfig>(GENERAL_CONFIG_KEY)
    if (savedConfig && typeof savedConfig.darkMode === "boolean") {
      return savedConfig.darkMode
    }

    // Verificar preferência do sistema
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    return false
  },

  // Aplicar o modo escuro
  applyDarkMode: (isDarkMode: boolean): void => {
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  },

  // Limpar todas as configurações
  clearAllConfigs: (): void => {
    cacheService.clear(CONFIG_CACHE_PREFIX)
  },
}

export default configService
