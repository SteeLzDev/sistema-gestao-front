"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PermissionGuardProps {
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  fallback?: ReactNode
  children: ReactNode
  showAlert?: boolean
  alertMessage?: string
}

export function PermissionGuard({
  permission,
  permissions = [],
  requireAll = false,
  fallback = null,
  children,
  showAlert = false,
  alertMessage = "Você não tem permissão para acessar este recurso.",
}: PermissionGuardProps) {
  const { hasPermission, user } = useAuth()

  // Verificar se o usuário tem as permissões necessárias
  const hasAccess = () => {
    // Se não houver permissões especificadas, permitir acesso
    if (!permission && (!permissions || permissions.length === 0)) {
      return true
    }

    // Se o usuário for ADMIN, permitir acesso a tudo
    if (user?.perfil === "ADMIN") {
      return true
    }

    // Verificar permissão única
    if (permission && hasPermission(permission)) {
      return true
    }

    // Verificar múltiplas permissões
    if (permissions && permissions.length > 0) {
      if (requireAll) {
        // Verificar se tem TODAS as permissões
        return permissions.every((perm) => hasPermission(perm))
      } else {
        // Verificar se tem PELO MENOS UMA das permissões
        return permissions.some((perm) => hasPermission(perm))
      }
    }

    return false
  }

  // Se o usuário não tiver acesso
  if (!hasAccess()) {
    // Se showAlert for true, mostrar um alerta
    if (showAlert) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )
    }

    // Caso contrário, mostrar o fallback
    return <>{fallback}</>
  }

  // Se passar nas verificações, renderizar o conteúdo
  return <>{children}</>
}
