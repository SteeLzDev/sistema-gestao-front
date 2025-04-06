"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Loader2 } from "lucide-react"

// Função para verificar se estamos no navegador
const isBrowser = () => typeof window !== "undefined"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Inicializar o estado do sidebar a partir do localStorage, se disponível
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (isBrowser()) {
      const savedState = localStorage.getItem("sidebarOpen")
      return savedState !== null ? savedState === "true" : true
    }
    return true
  })

  // Persistir o estado do sidebar no localStorage quando ele mudar
  useEffect(() => {
    if (isBrowser() && isMounted) {
      localStorage.setItem("sidebarOpen", String(isSidebarOpen))
    }
  }, [isSidebarOpen, isMounted])

  // Mostrar o botão de voltar em todas as páginas, exceto na dashboard principal
  const showBackButton = pathname !== "/dashboard"

  // Obter título da página com base no pathname
  const getPageTitle = () => {
    const path = pathname.split("/")[2] || pathname.split("/")[1]
    if (path === "dashboard") return "Dashboard"
    if (path === "vendas") return "Vendas"
    if (path === "estoque") return "Estoque"
    if (path === "fila") return "Fila de Clientes"
    if (path === "relatorios") return "Relatórios"
    if (path === "usuarios") return "Usuários"
    if (path === "configuracoes") return "Configurações"
    return ""
  }

  // Função para alternar o estado do sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsMounted(true)

    // Redirecionar para login se não estiver autenticado
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full" data-testid="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col w-full md:ml-64">
        <Header showBackButton={showBackButton} title={getPageTitle()} data-app-header="true" />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

