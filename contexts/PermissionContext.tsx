"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./AuthContext"
import { Permission } from "../types/permissions"

import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/services/apiClient"
import cacheService from "@/services/cacheServices"

// Mapeamento entre permissões do frontend e backend
const permissionMapping: Record<string, string> = {
  // Estoque
  [Permission.VIEW_INVENTORY]: "ESTOQUE_VISUALIZAR",
  [Permission.ADD_INVENTORY]: "ESTOQUE_ADICIONAR",
  [Permission.EDIT_INVENTORY]: "ESTOQUE_EDITAR",
  [Permission.DELETE_INVENTORY]: "ESTOQUE_REMOVER",

  // Vendas
  [Permission.VIEW_SALES]: "VENDAS_VISUALIZAR",
  [Permission.CREATE_SALE]: "VENDAS_CRIAR",
  [Permission.CANCEL_SALE]: "VENDAS_CANCELAR",

  // Fila
  [Permission.VIEW_QUEUE]: "FILA_VISUALIZAR",
  [Permission.MANAGE_QUEUE]: "FILA_GERENCIAR",

  // Relatórios
  [Permission.VIEW_REPORTS]: "RELATORIOS_VISUALIZAR",
  [Permission.EXPORT_REPORTS]: "RELATORIOS_EXPORTAR",

  // Usuários
  [Permission.VIEW_USERS]: "USUARIOS_VISUALIZAR",
  [Permission.CREATE_USER]: "USUARIOS_CRIAR",
  [Permission.EDIT_USER]: "USUARIOS_EDITAR",
  [Permission.DELETE_USER]: "USUARIOS_REMOVER",
  [Permission.MANAGE_PERMISSIONS]: "USUARIOS_PERMISSOES",

  // Configurações
  [Permission.VIEW_SETTINGS]: "CONFIGURACOES_VISUALIZAR",
  [Permission.EDIT_SETTINGS]: "CONFIGURACOES_EDITAR",
}

// Mapeamento inverso (backend para frontend)
const reversePermissionMapping: Record<string, Permission> = Object.entries(permissionMapping).reduce(
  (acc, [frontendPerm, backendPerm]) => {
    acc[backendPerm] = frontendPerm as Permission
    return acc
  },
  {} as Record<string, Permission>,
)

const PERMISSION_CACHE_PREFIX = "permission_"
const USER_PERMISSIONS_CACHE_KEY = "user_permissions"

interface PermissionContextProps {
  permissions: Permission[]
  backendPermissions: string[]
  loading: boolean
  hasPermission: (permissionName: string) => boolean
  hasAnyPermission: (permissionNames: string[]) => boolean
  hasAllPermissions: (permissionNames: string[]) => boolean
  refreshPermissions: () => Promise<void>
  clearPermissionCache: () => void
}

const PermissionContext = createContext<PermissionContextProps>({
  permissions: [],
  backendPermissions: [],
  loading: true,
  hasPermission: () => false,
  hasAnyPermission: () => false,
  hasAllPermissions: () => false,
  refreshPermissions: async () => {},
  clearPermissionCache: () => {},
})

interface PermissionProviderProps {
  children: React.ReactNode
}

// Constantes para cache
const PERMISSIONS_CACHE_KEY_PREFIX = "user_permissions_"
const PERMISSIONS_CACHE_EXPIRY = 30 // 30 minutos

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const [backendPermissions, setBackendPermissions] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const { toast } = useToast()

  // Converter permissões do backend para o frontend
  const convertToFrontendPermissions = (backendPerms: string[]): Permission[] => {
    return backendPerms
      .map((backendPerm) => reversePermissionMapping[backendPerm])
      .filter((perm): perm is Permission => !!perm)
  }

  // Verificar se o usuário tem uma permissão específica
  const hasPermission = useCallback(
    (permissionName: string): boolean => {
      // Se for uma permissão do frontend, converter para o formato do backend
      const backendPerm = permissionMapping[permissionName] || permissionName

      // Verificar se o usuário tem a permissão no formato do backend
      return backendPermissions.includes(backendPerm)
    },
    [backendPermissions],
  )

  // Verificar se o usuário tem pelo menos uma das permissões
  const hasAnyPermission = useCallback(
    (permissionNames: string[]): boolean => {
      return permissionNames.some((perm) => hasPermission(perm))
    },
    [hasPermission],
  )

  // Verificar se o usuário tem todas as permissões
  const hasAllPermissions = useCallback(
    (permissionNames: string[]): boolean => {
      return permissionNames.every((perm) => hasPermission(perm))
    },
    [hasPermission],
  )

  // Limpar o cache de permissões
  const clearPermissionCache = useCallback(() => {
    if (user?.id) {
      const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${user.id}`
      cacheService.remove(cacheKey)
      console.log("Cache de permissões limpo")
    } else {
      cacheService.clear(PERMISSIONS_CACHE_KEY_PREFIX)
      console.log("Todo o cache de permissões foi limpo")
    }
  }, [user?.id])

  // Função para buscar permissões do servidor
  const fetchPermissionsFromServer = async (userId: number): Promise<string[]> => {
    try {
      console.log(`Buscando permissões do usuário ${userId} do servidor...`)

      // Tentar obter permissões do usuário específico
      const response = await apiClient.get(`/permissoes/usuario/${userId}/todas`)
      const permissoes = response.data

      console.log(`Permissões obtidas do servidor:`, permissoes)

      // Armazenar no cache
      if (permissoes && Array.isArray(permissoes)) {
        const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${userId}`
        cacheService.set(cacheKey, permissoes, PERMISSIONS_CACHE_EXPIRY)
        console.log(`Permissões armazenadas no cache com chave ${cacheKey}`)
      }

      return permissoes || []
    } catch (error) {
      console.error("Erro ao buscar permissões do servidor:", error)
      throw error
    }
  }

  // Função para atualizar as permissões
  const refreshPermissions = async () => {
    if (!isAuthenticated || !user) {
      setBackendPermissions([])
      setPermissions([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      console.log("Atualizando permissões para o usuário:", user.id)

      // Tentar buscar permissões do servidor
      const permissoes = await fetchPermissionsFromServer(user.id)

      // Atualizar os estados
      setBackendPermissions(permissoes)
      setPermissions(convertToFrontendPermissions(permissoes))

      console.log("Permissões atualizadas:", permissoes)

      // Mostrar toast de sucesso
      toast({
        title: "Permissões atualizadas",
        description: "Suas permissões foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar permissões:", error)

      // Se o usuário tiver permissões no objeto user, usar como fallback
      if (user.permissoes && Array.isArray(user.permissoes)) {
        setBackendPermissions(user.permissoes)
        setPermissions(convertToFrontendPermissions(user.permissoes))

        // Mostrar toast de aviso
        toast({
          title: "Aviso",
          description: "Usando permissões em cache. Algumas funcionalidades podem estar limitadas.",
          variant: "default",
        })
      } else {
        // Mostrar toast de erro
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas permissões. Tente novamente mais tarde.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchUserPermissions = useCallback(async () => {
    if (!user) return

    setLoading(true)

    try {
      // Verificar se as permissões estão em cache
      const cachedPermissions = cacheService.get<string[]>(USER_PERMISSIONS_CACHE_KEY)

      if (cachedPermissions) {
        console.log("Usando permissões em cache")
        setBackendPermissions(cachedPermissions)
        setPermissions(convertToFrontendPermissions(cachedPermissions))
        setLoading(false)
        return
      }

      // Se não estiver em cache, buscar do servidor
      const permissoes = await fetchPermissionsFromServer(user.id)

      setBackendPermissions(permissoes)
      setPermissions(convertToFrontendPermissions(permissoes))

      // Salvar no cache por 30 minutos
      cacheService.set(USER_PERMISSIONS_CACHE_KEY, permissoes, 30)
    } catch (error) {
      console.error("Erro ao buscar permissões:", error)
      setPermissions([])
    } finally {
      setLoading(false)
    }
  }, [user, isAuthenticated, authLoading])

  const clearPermissionsCache = useCallback(() => {
    cacheService.remove(USER_PERMISSIONS_CACHE_KEY)
    cacheService.clear(PERMISSION_CACHE_PREFIX)
  }, [])

  const checkPermission = useCallback(
    async (requiredPermission: string): Promise<boolean> => {
      if (!user) return false

      // Verificar se o resultado está em cache
      const cacheKey = `${PERMISSION_CACHE_PREFIX}${requiredPermission}`
      const cachedResult = cacheService.get<boolean>(cacheKey)

      if (cachedResult !== null) {
        return cachedResult
      }

      // Se não estiver em cache, verificar nas permissões carregadas
      const hasPermission = backendPermissions.includes(requiredPermission)

      // Salvar resultado no cache por 30 minutos
      cacheService.set(cacheKey, hasPermission, 30)

      return hasPermission
    },
    [user, backendPermissions],
  )

  // Carregar permissões quando o usuário estiver autenticado
  useEffect(() => {
    const loadPermissions = async () => {
      if (!isAuthenticated || !user) {
        setBackendPermissions([])
        setPermissions([])
        setLoading(false)
        return
      }

      try {
        // Tentar carregar permissões do cache primeiro
        const cacheKey = `${PERMISSIONS_CACHE_KEY_PREFIX}${user.id}`
        const cachedPermissions = cacheService.get<string[]>(cacheKey)

        if (cachedPermissions && cachedPermissions.length > 0) {
          console.log("Usando permissões do cache:", cachedPermissions)
          setBackendPermissions(cachedPermissions)
          setPermissions(convertToFrontendPermissions(cachedPermissions))
          setLoading(false)
          return
        }

        // Se não houver permissões em cache ou estiverem expiradas, carregar do backend
        await refreshPermissions()
      } catch (error) {
        console.error("Erro ao carregar permissões:", error)

        // Se o usuário tiver permissões no objeto user, usar como fallback
        if (user.permissoes && Array.isArray(user.permissoes)) {
          setBackendPermissions(user.permissoes)
          setPermissions(convertToFrontendPermissions(user.permissoes))
        }

        setLoading(false)
      }
    }

    if (!authLoading) {
      loadPermissions()
    }
  }, [user, isAuthenticated, authLoading])

  useEffect(() => {
    if (!user) {
      setBackendPermissions([])
      setPermissions([])
      // Corrigido: usar clear com prefixo em vez de clearWithPrefix
      cacheService.remove(USER_PERMISSIONS_CACHE_KEY)
      cacheService.clear(PERMISSION_CACHE_PREFIX)
    }
  }, [user])

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        backendPermissions,
        loading,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        refreshPermissions,
        clearPermissionCache,
      }}
    >
      {children}
    </PermissionContext.Provider>
  )
}

export const usePermission = () => useContext(PermissionContext)
