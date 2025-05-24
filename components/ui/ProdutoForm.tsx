"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import produtoService from "@/services/produtoService"

interface ProdutoFormProps {
  produto?: {
    id?: number
    codigo: string
    nome: string
    categoria: string
    quantidade: number
    preco: number
  } | null | undefined
  onSave: () => void
  onCancel: () => void
}

export function ProdutoForm({ produto, onSave, onCancel }: ProdutoFormProps) {
  const [formData, setFormData] = useState(
    produto || {
      codigo: "",
      nome: "",
      categoria: "",
      quantidade: 0,
      preco: 0,
    },
  )
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (produto?.id) {
        await produtoService.atualizarProduto(produto.id, formData)
        toast({ title: "Sucesso", description: "Produto atualizado com sucesso." })
      } else {
        await produtoService.criarProduto(formData)
        toast({ title: "Sucesso", description: "Produto criado com sucesso." })
      }
      onSave()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar o produto.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="codigo">Código</Label>
        <Input id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="categoria">Categoria</Label>
        <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="quantidade">Quantidade</Label>
        <Input
          id="quantidade"
          name="quantidade"
          type="number"
          value={formData.quantidade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="preco">Preço</Label>
        <Input
          id="preco"
          name="preco"
          type="number"
          step="0.01"
          value={formData.preco}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  )
}

