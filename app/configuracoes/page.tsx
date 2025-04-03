"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Database, Globe, Bell, Shield, Moon, Sun, ArrowLeft } from 'lucide-react'

export default function ConfiguracoesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulando o salvamento das configurações
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/dashboard")} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Dashboard</span>
          </Button>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
        </div>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">
            <Globe className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="banco-dados">
            <Database className="h-4 w-4 mr-2" />
            Banco de Dados
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as opções gerais do sistema, como nome da empresa, tema e idioma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input id="empresa" defaultValue="Oficina Mecânica" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" defaultValue="Rua Exemplo, 123 - Centro" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 1234-5678" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contato@oficina.com" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="dark-mode">Modo Escuro</Label>
                    <span className="text-sm text-muted-foreground">Ativar o tema escuro para o sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="mt-4">
                  {loading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banco-dados">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Banco de Dados</CardTitle>
              <CardDescription>Configure a conexão com o banco de dados PostgreSQL.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-port">Porta</Label>
                  <Input id="db-port" defaultValue="5432" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-name">Nome do Banco</Label>
                  <Input id="db-name" defaultValue="sistema_gestao" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-user">Usuário</Label>
                  <Input id="db-user" defaultValue="postgres" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-password">Senha</Label>
                  <Input id="db-password" type="password" defaultValue="********" />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button type="button" variant="outline">
                    Testar Conexão
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Configurações"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Configure como e quando o sistema deve enviar notificações.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-estoque">Alertas de Estoque Baixo</Label>
                    <span className="text-sm text-muted-foreground">
                      Receber notificações quando o estoque estiver baixo
                    </span>
                  </div>
                  <Switch id="notif-estoque" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-vendas">Relatórios de Vendas</Label>
                    <span className="text-sm text-muted-foreground">Receber relatórios diários de vendas</span>
                  </div>
                  <Switch id="notif-vendas" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-login">Alertas de Login</Label>
                    <span className="text-sm text-muted-foreground">
                      Receber notificações de novos logins no sistema
                    </span>
                  </div>
                  <Switch id="notif-login" />
                </div>

                <Button type="submit" disabled={loading} className="mt-4">
                  {loading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Tempo de Sessão (minutos)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                    <span className="text-sm text-muted-foreground">
                      Exigir autenticação de dois fatores para login
                    </span>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="password-policy">Política de Senhas Forte</Label>
                    <span className="text-sm text-muted-foreground">
                      Exigir senhas fortes (mínimo 8 caracteres, letras, números e símbolos)
                    </span>
                  </div>
                  <Switch id="password-policy" defaultChecked />
                </div>

                <Button type="submit" disabled={loading} className="mt-4">
                  {loading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}