"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Package, AlertCircle } from "lucide-react"
import authService from "@/services/authService"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    username: "admin", // Credencial padrão que deve funcionar
    senha: "admin123",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log("Iniciando login com username:", formData.username)
      await authService.login(formData)

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao Sistema de Gestão",
      })

      // Verificar se o token foi armazenado corretamente
      if (!localStorage.getItem("token")) {
        throw new Error("Falha ao armazenar o token. Tente novamente.")
      }

      // Redirecionar para a página inicial
      router.push("/")
    } catch (error: any) {
      console.error("Erro ao fazer login:", error)
      setError(error?.message || error?.response?.data || "Nome de usuário ou senha incorretos. Tente novamente.")
      toast({
        title: "Erro de autenticação",
        description: error?.message || error?.response?.data || "Nome de usuário ou senha incorretos. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Sistema de Gestão</CardTitle>
          <CardDescription className="text-center">Entre com suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md mb-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Seu nome de usuário"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="senha">Senha</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="senha"
                name="senha"
                type="password"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            Para fins de demonstração, use: admin / admin123
          </p>
          <p className="text-center text-sm text-muted-foreground mt-1">Ou: carlos / 123456</p>
        </CardFooter>
      </Card>
    </div>
  )
}

