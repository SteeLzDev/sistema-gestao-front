"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useState } from "react"
import { Package } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex items-center border-b py-4">
            <Package className="mr-2 h-6 w-6" />
            <span className="text-lg font-semibold">Sistema de Gestão</span>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="grid gap-2 px-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/estoque"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Estoque
              </Link>
              <Link
                href="/vendas"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Vendas
              </Link>
              <Link
                href="/fila"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Fila de Clientes
              </Link>
              <Link
                href="/relatorios"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Relatórios
              </Link>
              <Link
                href="/usuarios"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Usuários
              </Link>
              <Link
                href="/configuracoes"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Configurações
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Sistema de Gestão</h1>
      </div>
    </header>
  )
}

