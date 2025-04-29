"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./AuthContext"
import { Permission } from "../types/permissions" 


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
  [Permission.MANAGE_PERMISSIONS]: "USUARIOS_GERENCIAR_PERMISSOES",

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

interface PermissionContextProps {
  permissions: Permission[]
  backendPermissions: string[]
  loading: boolean
  hasPermission: (permissionName: string) => boolean
  hasAnyPermission: (permissionNames: string[]) => boolean
  hasAllPermissions: (permissionNames: string[]) => boolean
  refreshPermissions: () => Promise<void>
}

const PermissionContext = createContext<PermissionContextProps>({
  permissions: [],
  backendPermissions: [],
  loading: true,
  hasPermission: () => false,
  hasAnyPermission: () => false,
  hasAllPermissions: () => false,
  refreshPermissions: async () => {},
})

interface PermissionProviderProps {
  children: React.ReactNode
}

// Adicionar expiração de cache para permissões
const PERMISSIONS_CACHE_EXPIRY = 30 * 60 * 1000 // 30 minutos em milissegundos

// Função para armazenar permissões com expiração
const storePermissionsWithExpiry = (userId: number, permissions: string[]) => {
  const item = {
    value: permissions,
    expiry: new Date().getTime() + PERMISSIONS_CACHE_EXPIRY,
  }
  localStorage.setItem(`user_permissions_${userId}`, JSON.stringify(item))
}

// Função para obter permissões com verificação de expiração
const getPermissionsWithExpiry = (userId: number): string[] | null => {
  const itemStr = localStorage.getItem(`user_permissions_${userId}`)
  if (!itemStr) return null

  const item = JSON.parse(itemStr)
  const now = new Date().getTime()

  // Verificar se o item expirou
  if (now > item.expiry) {
    localStorage.removeItem(`user_permissions_${userId}`)
    return null
  }

  return item.value
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const [backendPermissions, setBackendPermissions] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { isAuthenticated, user, loading: authLoading } = useAuth()

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

      // Simular chamada API para obter permissões
      // Em um ambiente real, você faria uma chamada à API
      const mockPermissions = user.permissoes || []

      // Armazenar as permissões no cache com expiração
      storePermissionsWithExpiry(user.id, mockPermissions)

      // Atualizar os estados
      setBackendPermissions(mockPermissions)
      setPermissions(convertToFrontendPermissions(mockPermissions))

      console.log("Permissões atualizadas:", mockPermissions)
    } catch (error) {
      console.error("Erro ao atualizar permissões:", error)

      // Se o usuário tiver permissões no objeto user, usar como fallback
      if (user.permissoes && Array.isArray(user.permissoes)) {
        setBackendPermissions(user.permissoes)
        setPermissions(convertToFrontendPermissions(user.permissoes))
      }
    } finally {
      setLoading(false)
    }
  }

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
        const cachedPermissions = getPermissionsWithExpiry(user.id)

        if (cachedPermissions) {
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
      }}
    >
      {children}
    </PermissionContext.Provider>
  )
}

export const usePermission = () => useContext(PermissionContext)
