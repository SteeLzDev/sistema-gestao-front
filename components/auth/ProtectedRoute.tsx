"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    // Em um cenário real, você verificaria o token JWT ou sessão
    const checkAuth = () => {
      // Rotas públicas que não precisam de autenticação
      const publicRoutes = ["/login", "/register", "/forgot-password"]

      // Simulando autenticação - em produção, verifique o token JWT
      const token = localStorage.getItem("token")

      if (!token && !publicRoutes.includes(pathname)) {
        // Redirecionar para login se não estiver autenticado
        router.push("/login")
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Simulando um usuário autenticado para desenvolvimento
  useEffect(() => {
    // Apenas para desenvolvimento - remova em produção
    if (process.env.NODE_ENV === "development") {
      localStorage.setItem("token", "fake-token-for-development")
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Se estiver autenticado ou em uma rota pública, renderize os filhos
  return <>{children}</>
}

