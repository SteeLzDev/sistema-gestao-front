"use client"

import Link from "next/link"
import { ThemeToggleAlt } from "./theme-toggle-alt"
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
              href="/fila"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/fila" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Fila
            </Link>
            <Link
              href="/clientes"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/clientes" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Clientes
            </Link>
            <Link
              href="/servicos"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/servicos" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Serviços
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* Espaço para busca ou outros elementos */}</div>
          <nav className="flex items-center">
            <ThemeToggleAlt />
          </nav>
        </div>
      </div>
    </header>
  )
}

