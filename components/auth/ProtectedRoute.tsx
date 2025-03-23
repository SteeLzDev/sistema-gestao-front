"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import authService from "@/services/authService"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)

      // Se não estiver autenticado e não estiver na página de login, redirecionar
      if (!authenticated && pathname !== "/login") {
        router.push("/login")
      } else if (authenticated && pathname === "/login") {
        // Se estiver autenticado e estiver na página de login, redirecionar para a página inicial
        router.push("/")
      }

      setLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  // Se estiver na página de login ou estiver autenticado, renderizar os filhos
  if (pathname === "/login" || isAuthenticated) {
    return <>{children}</>
  }

  // Caso contrário, não renderizar nada (o redirecionamento já foi iniciado)
  return null
}

