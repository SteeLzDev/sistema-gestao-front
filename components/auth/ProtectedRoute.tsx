// components/auth/ProtectedRoute.tsx
"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermission?: string
  fallback?: ReactNode
}

export default function ProtectedRoute({
  children,
  requiredPermission,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para login
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
    
    // Se requerer permissão específica e não tiver, redirecionar para acesso negado
    if (!loading && isAuthenticated && requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/acesso-negado")
    }
  }, [loading, isAuthenticated, requiredPermission, hasPermission, router])

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

  // Se requerer permissão específica e não tiver, mostrar fallback ou não renderizar nada
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || null
  }

  // Se estiver autenticado e tiver as permissões necessárias, renderizar o conteúdo
  return <>{children}</>
}