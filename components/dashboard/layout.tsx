"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Iniciar com o sidebar aberto
  const [isMounted, setIsMounted] = useState(false)

  // Determinar se devemos mostrar o botão de voltar
  const showBackButton = pathname !== "/dashboard"

  // Obter título da página com base no pathname
  const getPageTitle = () => {
    const path = pathname.split("/")[2] || pathname.split("/")[1]
    if (path === "dashboard") return "Dashboard"
    if (path === "vendas") return "Vendas"
    if (path === "estoque") return "Estoque"
    if (path === "relatorios") return "Relatórios"
    if (path === "fila") return "Fila" // Adicionamos o título para a Fila
    if (path === "configuracoes") return "Configurações"
    return ""
  }

  useEffect(() => {
    setIsMounted(true)

    // Se não estiver autenticado, redirecionar para login
    if (isMounted && !loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isMounted, loading, isAuthenticated, router])

  // Não renderizar nada durante SSR
  if (!isMounted) {
    return null
  }

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (o redirecionamento acontecerá no useEffect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full" data-testid="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 flex-col w-full md:ml-64">
        <Header title={getPageTitle()} data-app-header="true" />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}