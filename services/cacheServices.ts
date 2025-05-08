// Serviço para gerenciar cache no localStorage com expiração
const cacheService = {
    // Armazenar dados no cache com tempo de expiração
    set: <T = any>(key: string, data: T, expiryInMinutes = 30): void => {
      try {
        const item = {
          value: data,
          expiry: new Date().getTime() + expiryInMinutes * 60 * 1000,
        }
        localStorage.setItem(key, JSON.stringify(item))
      } catch (error: any) {
        console.error(`Erro ao armazenar item no cache: ${key}`, error)
      }
    },
  
    // Obter dados do cache, retorna null se expirado ou não existir
    get: <T>(key: string): T | null => {
      try {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return null
  
        const item = JSON.parse(itemStr)
        const now = new Date().getTime()
  
        // Verificar se o item expirou
        if (now > item.expiry) {
          localStorage.removeItem(key)
          return null
        }
  
        return item.value as T
      } catch (error: any) {
        console.error(`Erro ao recuperar item do cache: ${key}`, error)
        return null
      }
    },
  
    // Remover item do cache
    remove: (key: string): void => {
      try {
        localStorage.removeItem(key)
      } catch (error: any) {
        console.error(`Erro ao remover item do cache: ${key}`, error)
      }
    },
  
    // Limpar todo o cache ou apenas itens com um prefixo específico
    clear: (prefix?: string): void => {
      try {
        if (prefix) {
          // Remover apenas itens com o prefixo especificado
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(prefix)) {
              localStorage.removeItem(key)
            }
          })
        } else {
          // Limpar todo o localStorage
          localStorage.clear()
        }
      } catch (error: any) {
        console.error("Erro ao limpar cache", error)
      }
    },
  
    // Verificar se um item existe no cache e não está expirado
    has: (key: string): boolean => {
      try {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return false
  
        const item = JSON.parse(itemStr)
        const now = new Date().getTime()
  
        return now < item.expiry
      } catch (error: any) {
        console.error(`Erro ao verificar item no cache: ${key}`, error)
        return false
      }
    },
  
    // Atualizar a expiração de um item existente
    updateExpiry: (key: string, expiryInMinutes: number = 30): boolean => {
      try {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return false
  
        const item = JSON.parse(itemStr)
        item.expiry = new Date().getTime() + expiryInMinutes * 60 * 1000
        localStorage.setItem(key, JSON.stringify(item))
        return true
      } catch (error: any) {
        console.error(`Erro ao atualizar expiração do item no cache: ${key}`, error)
        return false
      }
    },
  }
  
  export default cacheService
  