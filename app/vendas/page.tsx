"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, FileText, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { VendaForm } from "@/components/venda/VendaForm"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Venda {
  id: number
  cliente: string
  data: string
  itens: number
  total: number
}

export default function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    carregarVendas()
  }, [])

  const carregarVendas = async () => {
    try {
      setLoading(true)
      setError(null)

      // Aqui você chamaria o serviço para carregar as vendas
      // const data = await vendaService.listarVendas()

      // Simulando o carregamento de vendas
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dados de exemplo
      const vendasExemplo = [
        { id: 1, cliente: "João Silva", data: "2025-03-10T10:30:00", itens: 3, total: 145.8 },
        { id: 2, cliente: "Maria Oliveira", data: "2025-03-10T14:15:00", itens: 1, total: 350.0 },
        { id: 3, cliente: "Carlos Santos", data: "2025-03-09T09:45:00", itens: 5, total: 212.5 },
        { id: 4, cliente: "Ana Pereira", data: "2025-03-09T16:20:00", itens: 2, total: 125.9 },
        { id: 5, cliente: "Roberto Lima", data: "2025-03-08T11:10:00", itens: 4, total: 415.3 },
      ]

      setVendas(vendasExemplo)
    } catch (error) {
      console.error("Erro ao carregar vendas:", error)
      setError("Não foi possível carregar as vendas. Verifique se o servidor está rodando.")
      toast({
        title: "Erro",
        description: "Não foi possível carregar as vendas.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setFormDialogOpen(false)
    carregarVendas()
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return format(data, "dd/MM/yyyy HH:mm", { locale: ptBR })
  }

  if (loading && vendas.length === 0) {
    return (
      <div className="container py-6 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando vendas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Registro de Vendas</h1>
        <Button onClick={() => setFormDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      {error ? (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <Button onClick={carregarVendas} className="mt-4">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Vendas Realizadas</CardTitle>
          <CardDescription>Total de vendas: {vendas.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Nº</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Itens</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell>#{venda.id.toString().padStart(3, "0")}</TableCell>
                  <TableCell className="font-medium">{venda.cliente}</TableCell>
                  <TableCell>{formatarData(venda.data)}</TableCell>
                  <TableCell className="text-center">{venda.itens}</TableCell>
                  <TableCell className="text-right">R$ {venda.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo de Formulário */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
            <DialogDescription>Preencha os campos abaixo para registrar uma nova venda.</DialogDescription>
          </DialogHeader>
          <VendaForm onSuccess={handleFormSuccess} onCancel={() => setFormDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

