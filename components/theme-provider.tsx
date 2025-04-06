"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Helper function to check if code is running in browser
const isBrowser = () => typeof window !== "undefined"

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  // Adicionar estado de montagem para evitar problemas de hidratação
  const [mounted, setMounted] = useState(false)

  // Initialize with defaultTheme and then update in useEffect
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Marcar componente como montado após a renderização inicial
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize theme from localStorage only on client-side
  useEffect(() => {
    if (isBrowser()) {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme) {
        setTheme(savedTheme)
      }
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    if (!isBrowser() || !mounted) return

    const root = window.document.documentElement

    // Remover classes anteriores
    root.classList.remove("light", "dark")

    // Se for system, detectar preferência do sistema
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    // Adicionar classe do tema
    root.classList.add(theme)

    // Desabilitar transições durante a mudança de tema
    if (disableTransitionOnChange) {
      root.classList.add("no-transitions")
      window.setTimeout(() => {
        root.classList.remove("no-transitions")
      }, 0)
    }
  }, [theme, enableSystem, disableTransitionOnChange, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (isBrowser()) {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  // Renderizar children sem modificações durante SSR ou antes da montagem
  // para evitar problemas de hidratação
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

