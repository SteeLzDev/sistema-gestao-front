// components/auth/ProtectedRoute.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para login
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  // Enquanto estiver carregando, mostrar um indicador de carregamento
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (o redirecionamento acontecerá no useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Se estiver autenticado, renderizar os filhos
  return <>{children}</>
}