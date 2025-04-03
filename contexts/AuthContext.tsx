"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Types
export interface User {
  id: number
  username: string
  nome: string
  perfil: string
  token?: string
}

export interface LoginCredentials {
  username: string
  senha: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to check if we're in browser
const isBrowser = () => typeof window !== "undefined"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is authenticated on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isBrowser()) {
          const storedUser = localStorage.getItem("user")
          const token = localStorage.getItem("auth_token")
          
          if (token && storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Falha na autenticação')
      }

      const data = await response.json()
      
      // Extract token and user data
      const { token, ...userData } = data
      
      // Create user object
      const loggedUser: User = {
        id: userData.id || userData.usuario?.id,
        username: userData.username || userData.usuario?.username,
        nome: userData.nome || userData.usuario?.nome,
        perfil: userData.perfil || userData.usuario?.perfil || 'USER',
        token
      }

      // Store in localStorage
      if (isBrowser()) {
        localStorage.setItem("auth_token", token)
        localStorage.setItem("user", JSON.stringify(loggedUser))
      }

      setUser(loggedUser)

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${loggedUser.nome || loggedUser.username}!`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      })
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    if (isBrowser()) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user")
    }
    
    setUser(null)
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
    
    router.push("/login")
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}