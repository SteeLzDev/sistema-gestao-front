"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserMenu } from "@/components/layout/UserMenu"
import { BarChart, Package, Users, ClipboardList, Settings, Home, Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/estoque",
      label: "Estoque",
      icon: Package,
    },
    {
      href: "/vendas",
      label: "Vendas",
      icon: BarChart,
    },
    {
      href: "/fila",
      label: "Fila de Clientes",
      icon: ClipboardList,
    },
    {
      href: "/relatorios",
      label: "Relatórios",
      icon: BarChart,
    },
    {
      href: "/usuarios",
      label: "Usuários",
      icon: Users,
    },
    {
      href: "/configuracoes",
      label: "Configurações",
      icon: Settings,
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b bg-background md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>Sistema de Gestão</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="px-2 py-4">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu Principal</h2>
                  <div className="space-y-1">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:text-foreground hover:bg-muted ${
                          pathname === route.href ? "bg-muted text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-auto p-4 border-t">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

