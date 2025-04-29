"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AccessDeniedPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-center text-2xl">Acesso Negado</CardTitle>
          <CardDescription className="text-center">Você não tem permissão para acessar este recurso.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Se você acredita que deveria ter acesso a esta página, entre em contato com o administrador do sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={() => router.push("/dashboard")}>
            <Home className="mr-2 h-4 w-4" />
            Ir para Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
