import type React from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toast } from "@/components/ui/toast"
import { ToastProvider } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { BarChart, Package, Users, ClipboardList, Settings, Home } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { UserMenu } from "@/components/layout/UserMenu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestão",
  description: "Sistema de gestão para oficina ou mercado",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
                  <div className="flex h-14 items-center border-b px-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                      <Package className="h-6 w-6" />
                      <span>Sistema de Gestão</span>
                    </Link>
                  </div>
                  <nav className="flex-1 overflow-auto py-4">
                    <div className="px-4 py-2">
                      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Menu Principal</h2>
                      <div className="space-y-1">
                        <Link
                          href="/"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <Home className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/estoque"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <Package className="h-4 w-4" />
                          Estoque
                        </Link>
                        <Link
                          href="/vendas"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <BarChart className="h-4 w-4" />
                          Vendas
                        </Link>
                        <Link
                          href="/fila"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <ClipboardList className="h-4 w-4" />
                          Fila de Clientes
                        </Link>
                        <Link
                          href="/relatorios"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <BarChart className="h-4 w-4" />
                          Relatórios
                        </Link>
                        <Link
                          href="/usuarios"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <Users className="h-4 w-4" />
                          Usuários
                        </Link>
                        <Link
                          href="/configuracoes"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                        >
                          <Settings className="h-4 w-4" />
                          Configurações
                        </Link>
                      </div>
                    </div>
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <UserMenu />
                  </div>
                </aside>
                <div className="flex-1 flex flex-col">{children}</div>
              </div>
            </ProtectedRoute>
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

