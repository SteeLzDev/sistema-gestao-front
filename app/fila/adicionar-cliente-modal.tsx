"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Cliente } from "@/types/fila"

interface AdicionarClienteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (cliente: Omit<Cliente, "id" | "chegada" | "espera">) => void
}

export default function AdicionarClienteModal({ isOpen, onClose, onSubmit }: AdicionarClienteModalProps) {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [servico, setServico] = useState("")
  const [prioridade, setPrioridade] = useState("NORMAL")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const cliente: Omit<Cliente, "id" | "chegada" | "espera"> = {
      nome,
      telefone,
      servico,
      prioridade,
      status: "AGUARDANDO",
    }

    onSubmit(cliente)

    // Limpar formulário
    setNome("")
    setTelefone("")
    setServico("")
    setPrioridade("NORMAL")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefone" className="text-right">
                Telefone
              </Label>
              <Input
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servico" className="text-right">
                Serviço
              </Label>
              <Input
                id="servico"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prioridade" className="text-right">
                Prioridade
              </Label>
              <Select value={prioridade} onValueChange={setPrioridade}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NORMAL">Normal</SelectItem>
                  <SelectItem value="PRIORITARIO">Prioritário</SelectItem>
                  <SelectItem value="URGENTE">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

