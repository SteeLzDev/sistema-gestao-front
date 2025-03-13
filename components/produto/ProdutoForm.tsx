"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { produtoService } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

interface Produto {
  id?: number
  codigo: string
  nome: string
  categoria: string
  quantidade: number
  preco: number
}

interface ProdutoFormProps {
  produto?: Produto
  onSuccess: () => void
  onCancel: () => void
}

export function ProdutoForm({ produto, onSuccess, onCancel }: ProdutoFormProps) {
  const [formData, setFormData] = useState<Produto>({
    id: produto?.id,
    codigo: produto?.codigo || "",
    nome: produto?.nome || "",
    categoria: produto?.categoria || "",
    quantidade: produto?.quantidade || 0,
    preco: produto?.preco || 0,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (produto?.id) {
        await produtoService.atualizarProduto(produto.id, formData)
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso.",
        })
      } else {
        await produtoService.criarProduto(formData)
        toast({
          title: "Sucesso",
          description: "Produto adicionado com sucesso.",
        })
      }
      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar o produto. Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="codigo">Código</Label>
        <Input
          id="codigo"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          placeholder="Ex: PROD001"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="nome">Nome do Produto</Label>
        <Input
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Ex: Óleo de Motor 5W30"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="categoria">Categoria</Label>
        <Input
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Ex: Automotivo"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="quantidade">Quantidade em Estoque</Label>
        <Input
          id="quantidade"
          name="quantidade"
          type="number"
          min="0"
          value={formData.quantidade}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="preco">Preço (R$)</Label>
        <Input
          id="preco"
          name="preco"
          type="number"
          step="0.01"
          min="0"
          value={formData.preco}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : produto?.id ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  )
}

