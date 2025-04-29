"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredPermissions?: string[]
  requireAll?: boolean
  fallback?: React.ReactNode
  showAlert?: boolean
  redirectToAccessDenied?: boolean
}

export default function ProtectedRoute({
  children,
  requiredPermission,
  requiredPermissions = [],
  requireAll = false,
  fallback,
  showAlert = false,
  redirectToAccessDenied = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, hasPermission } = useAuth()
  const router = useRouter()

  // Verificar se o usuário tem as permissões necessárias
  const hasAccess = () => {
    // Se não houver permissões requeridas, permitir acesso
    if (!requiredPermission && (!requiredPermissions || requiredPermissions.length === 0)) {
      return true
    }

    // Verificar permissão única
    if (requiredPermission && !hasPermission(requiredPermission)) {
      return false
    }

    // Verificar múltiplas permissões
    if (requiredPermissions && requiredPermissions.length > 0) {
      if (requireAll) {
        // Verificar se tem TODAS as permissões
        return requiredPermissions.every((perm) => hasPermission(perm))
      } else {
        // Verificar se tem PELO MENOS UMA das permissões
        return requiredPermissions.some((perm) => hasPermission(perm))
      }
    }

    return true
  }

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para login
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    // Se estiver autenticado, verificar permissões
    if (!loading && isAuthenticated) {
      // Se não tiver acesso e a opção de redirecionamento estiver ativada
      if (!hasAccess() && redirectToAccessDenied) {
        router.push("/acesso-negado")
      }
    }
  }, [loading, isAuthenticated, router, redirectToAccessDenied])

  // Mostrar loader enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (redirecionamento acontecerá)
  if (!isAuthenticated) {
    return null
  }

  // Se não tiver acesso
  if (!hasAccess()) {
    // Se não estiver redirecionando para página de acesso negado
    if (!redirectToAccessDenied) {
      // Se houver um fallback, mostrar
      if (fallback) {
        return <>{fallback}</>
      }

      // Se showAlert for true, mostrar um alerta
      if (showAlert) {
        return (
          <div className="flex h-screen w-full flex-col items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md">
              <ShieldAlert className="h-5 w-5" />
              <AlertDescription className="mt-2">Você não tem permissão para acessar esta página.</AlertDescription>
            </Alert>
          </div>
        )
      }

      // Caso contrário, não renderizar nada
      return null
    }

    // Se estiver redirecionando, mostrar um loader enquanto redireciona
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se estiver autenticado e tiver as permissões necessárias, renderizar o conteúdo
  return <>{children}</>
}
