"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Sistema de Gestão</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/estoque"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/estoque" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Estoque
            </Link>
            <Link
              href="/vendas"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/vendas" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Vendas
            </Link>
            <Link
              href="/fila"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/fila" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Fila de Clientes
            </Link>
            <Link
              href="/relatorios"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/relatorios" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Relatórios
            </Link>
            <Link
              href="/usuarios"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/usuarios" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Usuários
            </Link>
            <Link
              href="/configuracoes"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/configuracoes" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Configurações
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* Espaço para busca ou outros elementos */}</div>
        </div>
      </div>
    </header>
  )
}