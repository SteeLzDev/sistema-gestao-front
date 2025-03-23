"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import usuarioService from "@/services/usuarioService"
import { useToast } from "@/components/ui/use-toast"

interface Usuario {
  id?: number
  nome: string
  username: string
  email: string
  senha: string
  cargo: string
  perfil: string
  status: string
}

interface UsuarioFormProps {
  usuario?: Usuario
  onSuccess: () => void
  onCancel: () => void
}

export function UsuarioForm({ usuario, onSuccess, onCancel }: UsuarioFormProps) {
  const [formData, setFormData] = useState<Usuario>({
    id: usuario?.id,
    nome: usuario?.nome || "",
    username: usuario?.username || "",
    email: usuario?.email || "",
    senha: usuario?.senha || "",
    cargo: usuario?.cargo || "",
    perfil: usuario?.perfil || "Operador",
    status: usuario?.status || "Ativo",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (usuario?.id) {
        await usuarioService.atualizarUsuario(usuario.id, formData)
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
        })
      } else {
        await usuarioService.criarUsuario(formData)
        toast({
          title: "Sucesso",
          description: "Usuário adicionado com sucesso.",
        })
      }
      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar o usuário. Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Ex: João Silva"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="username">Nome de Usuário</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Ex: joao.silva"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: joao.silva@empresa.com"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          placeholder={usuario?.id ? "••••••••" : "Digite a senha"}
          required={!usuario?.id}
        />
        {usuario?.id && <p className="text-xs text-muted-foreground">Deixe em branco para manter a senha atual.</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cargo">Cargo</Label>
        <Input
          id="cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          placeholder="Ex: Gerente"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="perfil">Perfil</Label>
        <Select value={formData.perfil} onValueChange={(value) => handleSelectChange("perfil", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Administrador">Administrador</SelectItem>
            <SelectItem value="Operador">Operador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : usuario?.id ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  )
}

