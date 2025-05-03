"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import usuarioService, { type Usuario, type NovoUsuario, type EditarUsuario } from "@/services/usuarioService"
import { useAuth } from "@/contexts/AuthContext"

interface UsuarioFormProps {
  usuario?: Usuario
  onSuccess?: () => void
  onCancel?: () => void
}

// Tipo para o estado do formulário que combina todos os campos possíveis
interface FormState {
  nome: string
  username: string
  email: string
  senha: string
  cargo: string
  perfil: string
  status: string
}

export function UsuarioForm({ usuario, onSuccess, onCancel }: UsuarioFormProps) {
  const { toast } = useToast()
  const { refreshAuth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Usar um tipo específico para o estado do formulário
  const [formData, setFormData] = useState<FormState>({
    nome: "",
    username: "",
    email: "",
    senha: "",
    cargo: "",
    perfil: "Operador",
    status: "Ativo",
  })

  // Preencher o formulário com os dados do usuário, se fornecido
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome || "",
        username: usuario.username || "",
        email: usuario.email || "",
        senha: "", // Não preencher a senha por segurança
        cargo: usuario.cargo || "",
        perfil: usuario.perfil || "Operador",
        status: usuario.status || "Ativo",
      })
    }
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const errors = []

    if (!formData.nome) errors.push("Nome é obrigatório")
    if (!formData.username) errors.push("Nome de usuário é obrigatório")
    if (!usuario && !formData.senha) errors.push("Senha é obrigatória para novos usuários")
    if (!formData.cargo) errors.push("Cargo é obrigatório")
    if (!formData.email) errors.push("Email é obrigatório")

    // Validar formato de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Formato de email inválido")
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar formulário
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(`Por favor, corrija os seguintes erros:\n${validationErrors.join("\n")}`)
      return
    }

    setLoading(true)

    try {
      // Verificar token antes de enviar
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Token de autenticação não encontrado. Por favor, faça login novamente.")
      }

      console.log("Enviando dados do usuário:", formData)

      // Verificar se é uma edição ou criação
      if (usuario) {
        // Se for edição, criar um objeto EditarUsuario
        const dadosAtualizacao: EditarUsuario = {
          nome: formData.nome,
          email: formData.email,
          cargo: formData.cargo,
          perfil: formData.perfil,
          status: formData.status,
        }

        // Se a senha estiver vazia, não enviar para o servidor
        if (formData.senha) {
          dadosAtualizacao.senha = formData.senha
        }

        await usuarioService.atualizarUsuario(usuario.id, dadosAtualizacao)
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
        })
      } else {
        // Se for criação, verificar se o username já existe antes de enviar
        const usernameDisponivel = await usuarioService.verificarUsernameDisponivel(formData.username)
        if (!usernameDisponivel) {
          throw new Error(`O nome de usuário '${formData.username}' já está em uso. Escolha outro nome de usuário.`)
        }

        // Criar um objeto NovoUsuario explicitamente
        const novoUsuario: NovoUsuario = {
          nome: formData.nome,
          username: formData.username,
          email: formData.email,
          senha: formData.senha,
          cargo: formData.cargo,
          perfil: formData.perfil,
          status: formData.status,
        }

        await usuarioService.criarUsuario(novoUsuario)
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso.",
        })
      }

      // Chamar o callback de sucesso, se fornecido
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Erro ao salvar usuário:", error)

      // Verificar se é um erro de autenticação
      if (error.response && error.response.status === 401) {
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Tentando renovar automaticamente...",
          variant: "destructive",
        })

        try {
          // Tentar renovar o token usando a função do AuthContext existente
          await refreshAuth()
          toast({
            title: "Token renovado",
            description: "Sua sessão foi renovada. Por favor, tente novamente.",
          })
        } catch (refreshError) {
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível renovar sua sessão. Por favor, faça login novamente.",
            variant: "destructive",
          })
        }
      } else {
        setError(error.message || "Não foi possível salvar o usuário.")
        toast({
          title: "Erro",
          description: error.message || "Não foi possível salvar o usuário.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="nome">Nome*</Label>
        <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Nome de Usuário*</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={!!usuario} // Desabilitar edição de username para usuários existentes
        />
        {!!usuario && (
          <p className="text-xs text-muted-foreground">O nome de usuário não pode ser alterado após a criação.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email*</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="exemplo@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">{usuario ? "Senha (deixe em branco para manter a senha atual)" : "Senha*"}</Label>
        <Input
          id="senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          required={!usuario} // Senha é obrigatória apenas para novos usuários
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo*</Label>
        <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="perfil">Perfil*</Label>
        <Select value={formData.perfil} onValueChange={(value) => handleSelectChange("perfil", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Administrador">Administrador</SelectItem>
            <SelectItem value="Operador">Operador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status*</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {usuario ? "Atualizando..." : "Criando..."}
            </>
          ) : usuario ? (
            "Atualizar"
          ) : (
            "Criar"
          )}
        </Button>
      </div>
    </form>
  )
}
