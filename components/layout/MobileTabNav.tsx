"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, BarChart, ClipboardList, Settings } from "lucide-react"

export function MobileTabNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full border-t bg-background md:hidden">
      <Link
        href="/"
        className={`flex flex-1 flex-col items-center justify-center py-2 ${
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs">Início</span>
      </Link>
      <Link
        href="/estoque"
        className={`flex flex-1 flex-col items-center justify-center py-2 ${
          pathname.startsWith("/estoque") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Package className="h-5 w-5" />
        <span className="text-xs">Estoque</span>
      </Link>
      <Link
        href="/vendas"
        className={`flex flex-1 flex-col items-center justify-center py-2 ${
          pathname.startsWith("/vendas") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <BarChart className="h-5 w-5" />
        <span className="text-xs">Vendas</span>
      </Link>
      <Link
        href="/fila"
        className={`flex flex-1 flex-col items-center justify-center py-2 ${
          pathname.startsWith("/fila") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <ClipboardList className="h-5 w-5" />
        <span className="text-xs">Fila</span>
      </Link>
      <Link
        href="/configuracoes"
        className={`flex flex-1 flex-col items-center justify-center py-2 ${
          pathname.startsWith("/configuracoes") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Settings className="h-5 w-5" />
        <span className="text-xs">Config</span>
      </Link>
    </div>
  )
}

