"use client"

import { useState, useEffect } from "react"
import { filaService } from "@/services/filaService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdicionarClienteModal from "./adicionar-cliente-modal"
import type { Cliente, Atendimento } from "@/types/fila"
// No início do arquivo, importe o Header sem o seletor de tema
import { Header } from "@/components/header-no-theme"

export default function FilaPage() {
  const [clientesNaFila, setClientesNaFila] = useState<Cliente[]>([])
  const [clientesEmAtendimento, setClientesEmAtendimento] = useState<Atendimento[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [atendenteNome, setAtendenteNome] = useState("Atendente") // Nome do atendente atual

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      // Carregamos apenas os clientes na fila, já que não temos endpoint para atendimentos
      const fila = await filaService.getClientesNaFila()
      setClientesNaFila(fila)

      // Por enquanto, mantemos a lista de atendimentos vazia
      // Você precisará implementar um endpoint no backend para listar atendimentos
      setClientesEmAtendimento([])
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
      setError("Não foi possível carregar os dados da fila. Verifique se o servidor está rodando.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
    // Atualizar a cada 30 segundos
    const interval = setInterval(carregarDados, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleIniciarAtendimento = async (id: number) => {
    try {
      await filaService.iniciarAtendimento(id, atendenteNome)
      carregarDados()
    } catch (err) {
      console.error("Erro ao iniciar atendimento:", err)
      alert("Erro ao iniciar atendimento. Tente novamente.")
    }
  }

  const handleFinalizarAtendimento = async (id: number) => {
    try {
      await filaService.finalizarAtendimento(id)
      carregarDados()
    } catch (err) {
      console.error("Erro ao finalizar atendimento:", err)
      alert("Erro ao finalizar atendimento. Tente novamente.")
    }
  }

  const handleRemoverCliente = async (id: number) => {
    try {
      await filaService.removerClienteDaFila(id)
      carregarDados()
    } catch (err) {
      console.error("Erro ao remover cliente:", err)
      alert("Erro ao remover cliente. Tente novamente.")
    }
  }

  const handleAdicionarCliente = async (cliente: Omit<Cliente, "id" | "chegada" | "espera">) => {
    try {
      await filaService.adicionarClienteNaFila(cliente)
      setIsModalOpen(false)
      carregarDados()
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err)
      alert("Erro ao adicionar cliente. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gerenciamento de Fila</h1>
            <Button onClick={() => setIsModalOpen(true)}>Adicionar Cliente</Button>
          </div>

          {loading && <p className="text-center">Carregando dados...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clientes na Fila</CardTitle>
              </CardHeader>
              <CardContent>
                {clientesNaFila.length === 0 ? (
                  <p className="text-center text-muted-foreground">Não há clientes na fila</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Espera</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientesNaFila.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{cliente.servico}</TableCell>
                          <TableCell>{cliente.espera}</TableCell>
                          <TableCell className="space-x-2">
                            <Button size="sm" onClick={() => handleIniciarAtendimento(cliente.id)}>
                              Atender
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoverCliente(cliente.id)}>
                              Remover
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Em Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                {clientesEmAtendimento.length === 0 ? (
                  <p className="text-center text-muted-foreground">Não há clientes em atendimento</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Atendente</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientesEmAtendimento.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{cliente.servico}</TableCell>
                          <TableCell>{cliente.atendente}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleFinalizarAtendimento(cliente.id)}
                            >
                              Finalizar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <AdicionarClienteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAdicionarCliente}
        />
      )}
    </div>
  )
}

