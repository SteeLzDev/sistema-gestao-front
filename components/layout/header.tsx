"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  showBackButton?: boolean
  title?: string
  className?: string
  [key: string]: any // Para permitir data-attributes e outras props
}

export function Header({ showBackButton = false, title, className, ...props }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <header className={cn("flex h-16 items-center border-b px-4", className)} {...props}>
      {showBackButton && (
        <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Button>
      )}

      {title && <h1 className="text-base font-semibold">{title}</h1>}

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setShowUserMenu(!showUserMenu)}>
            <Avatar className="h-7 w-7">
              <AvatarImage src="/placeholder.svg" alt={user?.nome || "Avatar"} />
              <AvatarFallback>{user?.nome?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Minha Conta</span>
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border bg-background p-1 shadow-md">
              <div className="px-2 py-1 text-xs font-semibold">Minha Conta</div>
              <button
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setShowUserMenu(false)
                  router.push("/perfil")
                }}
              >
                <User className="mr-2 h-3 w-3" />
                <span>Perfil</span>
              </button>
              <div className="my-1 h-px bg-muted"></div>
              <button
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-3 w-3" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

