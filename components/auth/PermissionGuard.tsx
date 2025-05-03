"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PermissionGuardProps {
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  fallback?: ReactNode
  children: ReactNode
  showAlert?: boolean
  alertMessage?: string
  redirectTo?: string
}

export function PermissionGuard({
  permission,
  permissions = [],
  requireAll = false,
  fallback = null,
  children,
  showAlert = false,
  alertMessage = "Você não tem permissão para acessar este recurso.",
  redirectTo,
}: PermissionGuardProps) {
  const { hasPermission, user } = useAuth()
  const router = useRouter()

  // Verificar se o usuário é administrador
  const isAdmin = user?.perfil === "ADMIN" || user?.perfil === "Administrador"

  // Verificar se o usuário tem as permissões necessárias
  const hasAccess = () => {
    // Se não houver permissões especificadas, permitir acesso
    if (!permission && (!permissions || permissions.length === 0)) {
      return true
    }

    // Se o usuário for ADMIN, permitir acesso a tudo
    if (isAdmin) {
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

  // Redirecionar se não tiver acesso e redirectTo estiver definido
  useEffect(() => {
    if (!hasAccess() && redirectTo) {
      router.push(redirectTo)
    }
  }, [redirectTo, router])

  // Se o usuário não tiver acesso
  if (!hasAccess()) {
    // Se redirectTo estiver definido, não renderizar nada (o redirecionamento acontecerá no useEffect)
    if (redirectTo) {
      return null
    }

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
