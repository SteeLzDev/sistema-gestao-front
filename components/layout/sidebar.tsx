"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, ListChecks, BarChart, Settings, Menu, Users, ClipboardList } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const sidebarItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/estoque", icon: ListChecks, label: "Estoque" },
  { href: "/vendas", icon: ShoppingBag, label: "Vendas" },
  { href: "/fila", icon: ClipboardList, label: "Fila de Clientes" },
  { href: "/relatorios", icon: BarChart, label: "Relatórios" },
  { href: "/usuarios", icon: Users, label: "Usuários" },
  { href: "/configuracoes", icon: Settings, label: "Configurações" },
]

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Função para navegar sem fechar o sidebar
  const handleNavigation = (href: string) => {
    router.push(href)
    // Não fechamos o sidebar após a navegação
    // Apenas em dispositivos móveis fechamos o menu
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }

  return (
    <>
      {/* Mobile Sidebar Button */}
      <Button variant="ghost" size="icon" className="absolute left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Abrir menu</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-64 flex-col overflow-y-auto border-r bg-background py-4 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-6 pb-4">
          <h1 className="text-lg font-semibold">Sistema de Gestão</h1>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-start gap-2 rounded-md px-3.5 py-2 text-sm font-medium hover:bg-secondary",
                pathname === item.href && "bg-secondary"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  )
}