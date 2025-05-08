"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Database, Globe, Bell, Shield, Moon, Sun, Check, AlertTriangle } from "lucide-react"
import { BackButton } from "@/components/ui/BackButton"
import configService, {
  type GeneralConfig,
  type DatabaseConfig,
  type NotificationConfig,
  type SecurityConfig,
} from "@/services/configService"
import errorService from "@/services/erroService"


export default function ConfiguracoesPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Estados para cada seção de configuração
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>(configService.loadGeneralConfig())
  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>(configService.loadDatabaseConfig())
  const [notificationConfig, setNotificationConfig] = useState<NotificationConfig>(
    configService.loadNotificationConfig(),
  )
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>(configService.loadSecurityConfig())

  // Estados para controle de UI
  const [activeTab, setActiveTab] = useState("geral")
  const [loading, setLoading] = useState(false)
  const [testingConnection, setTestingConnection] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Efeito para aplicar o tema escuro quando o componente montar
  useEffect(() => {
    const isDarkMode = configService.detectDarkMode()
    setGeneralConfig((prev) => ({ ...prev, darkMode: isDarkMode }))
    configService.applyDarkMode(isDarkMode)
  }, [])

  // Efeito para aplicar o tema escuro quando a configuração mudar
  useEffect(() => {
    configService.applyDarkMode(generalConfig.darkMode)
  }, [generalConfig.darkMode])

  // Manipuladores para salvar cada seção de configuração
  const handleSaveGeneralConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const success = await configService.saveGeneralConfig(generalConfig)
      if (success) {
        setFeedback({ type: "success", message: "Configurações gerais salvas com sucesso!" })
        toast({
          title: "Configurações salvas",
          description: "As configurações gerais foram salvas com sucesso.",
        })
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao salvar configurações gerais." })
      errorService.handleError(error, "Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDatabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const success = await configService.saveDatabaseConfig(databaseConfig)
      if (success) {
        setFeedback({ type: "success", message: "Configurações de banco de dados salvas com sucesso!" })
        toast({
          title: "Configurações salvas",
          description: "As configurações de banco de dados foram salvas com sucesso.",
        })
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao salvar configurações de banco de dados." })
      errorService.handleError(error, "Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotificationConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const success = await configService.saveNotificationConfig(notificationConfig)
      if (success) {
        setFeedback({ type: "success", message: "Configurações de notificações salvas com sucesso!" })
        toast({
          title: "Configurações salvas",
          description: "As configurações de notificações foram salvas com sucesso.",
        })
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao salvar configurações de notificações." })
      errorService.handleError(error, "Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSecurityConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const success = await configService.saveSecurityConfig(securityConfig)
      if (success) {
        setFeedback({ type: "success", message: "Configurações de segurança salvas com sucesso!" })
        toast({
          title: "Configurações salvas",
          description: "As configurações de segurança foram salvas com sucesso.",
        })
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao salvar configurações de segurança." })
      errorService.handleError(error, "Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  // Testar conexão com o banco de dados
  const handleTestConnection = async () => {
    setTestingConnection(true)
    setFeedback(null)

    try {
      await configService.testDatabaseConnection(databaseConfig)
    } catch (error) {
      // O erro já é tratado pelo configService
    } finally {
      setTestingConnection(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-4 p-4 rounded-md ${feedback.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
        >
          <div className="flex items-center">
            {feedback.type === "success" ? (
              <Check className="h-5 w-5 mr-2 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            )}
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
              <form onSubmit={handleSaveGeneralConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input
                    id="empresa"
                    value={generalConfig.companyName}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, companyName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={generalConfig.address}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={generalConfig.phone}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, phone: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalConfig.email}
                    onChange={(e) => setGeneralConfig({ ...generalConfig, email: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="dark-mode">Modo Escuro</Label>
                    <span className="text-sm text-muted-foreground">Ativar o tema escuro para o sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch
                      id="dark-mode"
                      checked={generalConfig.darkMode}
                      onCheckedChange={(checked) => setGeneralConfig({ ...generalConfig, darkMode: checked })}
                    />
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
              <form onSubmit={handleSaveDatabaseConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input
                    id="db-host"
                    value={databaseConfig.host}
                    onChange={(e) => setDatabaseConfig({ ...databaseConfig, host: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-port">Porta</Label>
                  <Input
                    id="db-port"
                    value={databaseConfig.port}
                    onChange={(e) => setDatabaseConfig({ ...databaseConfig, port: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-name">Nome do Banco</Label>
                  <Input
                    id="db-name"
                    value={databaseConfig.database}
                    onChange={(e) => setDatabaseConfig({ ...databaseConfig, database: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-user">Usuário</Label>
                  <Input
                    id="db-user"
                    value={databaseConfig.username}
                    onChange={(e) => setDatabaseConfig({ ...databaseConfig, username: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-password">Senha</Label>
                  <Input
                    id="db-password"
                    type="password"
                    value={databaseConfig.password}
                    onChange={(e) => setDatabaseConfig({ ...databaseConfig, password: e.target.value })}
                    placeholder="********"
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button type="button" variant="outline" onClick={handleTestConnection} disabled={testingConnection}>
                    {testingConnection ? "Testando..." : "Testar Conexão"}
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
              <form onSubmit={handleSaveNotificationConfig} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-estoque">Alertas de Estoque Baixo</Label>
                    <span className="text-sm text-muted-foreground">
                      Receber notificações quando o estoque estiver baixo
                    </span>
                  </div>
                  <Switch
                    id="notif-estoque"
                    checked={notificationConfig.lowStockAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({ ...notificationConfig, lowStockAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-vendas">Relatórios de Vendas</Label>
                    <span className="text-sm text-muted-foreground">Receber relatórios diários de vendas</span>
                  </div>
                  <Switch
                    id="notif-vendas"
                    checked={notificationConfig.salesReports}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({ ...notificationConfig, salesReports: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-login">Alertas de Login</Label>
                    <span className="text-sm text-muted-foreground">
                      Receber notificações de novos logins no sistema
                    </span>
                  </div>
                  <Switch
                    id="notif-login"
                    checked={notificationConfig.loginAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({ ...notificationConfig, loginAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="notif-email">Notificações por Email</Label>
                    <span className="text-sm text-muted-foreground">
                      Enviar notificações por email além das notificações no sistema
                    </span>
                  </div>
                  <Switch
                    id="notif-email"
                    checked={notificationConfig.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({ ...notificationConfig, emailNotifications: checked })
                    }
                  />
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
              <form onSubmit={handleSaveSecurityConfig} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Tempo de Sessão (minutos)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securityConfig.sessionTimeout}
                    onChange={(e) =>
                      setSecurityConfig({ ...securityConfig, sessionTimeout: Number.parseInt(e.target.value) || 30 })
                    }
                    min="1"
                    max="1440"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="login-attempts">Tentativas de Login</Label>
                  <Input
                    id="login-attempts"
                    type="number"
                    value={securityConfig.loginAttempts}
                    onChange={(e) =>
                      setSecurityConfig({ ...securityConfig, loginAttempts: Number.parseInt(e.target.value) || 3 })
                    }
                    min="1"
                    max="10"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    Número de tentativas de login antes de bloquear a conta
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                    <span className="text-sm text-muted-foreground">
                      Exigir autenticação de dois fatores para login
                    </span>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={securityConfig.twoFactorAuth}
                    onCheckedChange={(checked) => setSecurityConfig({ ...securityConfig, twoFactorAuth: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="password-policy">Política de Senhas Forte</Label>
                    <span className="text-sm text-muted-foreground">
                      Exigir senhas fortes (mínimo 8 caracteres, letras, números e símbolos)
                    </span>
                  </div>
                  <Switch
                    id="password-policy"
                    checked={securityConfig.strongPasswordPolicy}
                    onCheckedChange={(checked) =>
                      setSecurityConfig({ ...securityConfig, strongPasswordPolicy: checked })
                    }
                  />
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
