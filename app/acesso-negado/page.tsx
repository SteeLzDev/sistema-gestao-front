"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function AcessoNegadoPage() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Acesso Negado</CardTitle>
          <CardDescription className="text-center">
            Você não tem permissão para acessar esta página.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p>
              Seu perfil atual ({user?.perfil}) não possui as permissões necessárias para acessar este recurso.
            </p>
            <p>
              Entre em contato com o administrador do sistema caso acredite que deveria ter acesso a esta funcionalidade.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Voltar para Dashboard
          </Button>
          <Button onClick={() => router.back()}>
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}