"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export function ThemeToggleAlt() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fechar o menu quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <Button ref={buttonRef} variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-36 rounded-md bg-background border border-border shadow-lg z-50"
        >
          <div className="py-1">
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${theme === "light" ? "bg-accent/50" : ""}`}
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
            >
              Light
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${theme === "dark" ? "bg-accent/50" : ""}`}
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
            >
              Dark
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${theme === "system" ? "bg-accent/50" : ""}`}
              onClick={() => {
                setTheme("system")
                setIsOpen(false)
              }}
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

