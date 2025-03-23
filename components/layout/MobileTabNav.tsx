"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, BarChart, ClipboardList, Users } from "lucide-react"

export function MobileTabNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Início",
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
      label: "Fila",
      icon: ClipboardList,
    },
    {
      href: "/usuarios",
      label: "Usuários",
      icon: Users,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-between items-center">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              pathname === route.href ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

