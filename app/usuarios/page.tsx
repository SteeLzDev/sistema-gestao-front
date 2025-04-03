"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash, Shield, User, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import usuarioService from "@/services/usuarioService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { UsuarioForm } from "@/components/usuario/UsuarioForm"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Usuario {
  id: number
  nome: string
  username: string
  email: string
  senha: string
  cargo: string
  perfil: string
  status: string
}

export default function UsuariosPage() {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const carregarUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usuarioService.listarUsuarios()
      setUsuarios(data)
      toast({
        title: "Sucesso",
        description: "Usuários carregados com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao carregar usuários:", error)
      setError("Não foi possível carregar os usuários. Verifique se o servidor está rodando.")
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setSelectedUsuario(null)
    setFormDialogOpen(true)
  }

  const handleEditClick = (usuario: Usuario) => {
    setSelectedUsuario(usuario)
    setFormDialogOpen(true)
  }

  const handleDeleteClick = (usuario: Usuario) => {
    setSelectedUsuario(usuario)
    setDeleteDialogOpen(true)
  }

  const handleFormSuccess = () => {
    setFormDialogOpen(false)
    carregarUsuarios()
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUsuario) return

    try {
      await usuarioService.removerUsuario(selectedUsuario.id)
      toast({
        title: "Sucesso",
        description: "Usuário removido com sucesso.",
      })
      carregarUsuarios()
    } catch (error) {
      console.error("Erro ao remover usuário:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o usuário.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  // Dados de exemplo para desenvolvimento
  const usuariosExemplo = [
    {
      id: 1,
      nome: "Carlos Oliveira",
      username: "carlos",
      email: "carlos@oficina.com",
      senha: "123456",
      cargo: "Gerente",
      perfil: "Administrador",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Ana Silva",
      username: "ana",
      email: "ana@oficina.com",
      senha: "123456",
      cargo: "Atendente",
      perfil: "Operador",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Roberto Santos",
      username: "roberto",
      email: "roberto@oficina.com",
      senha: "123456",
      cargo: "Mecânico",
      perfil: "Operador",
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Juliana Costa",
      username: "juliana",
      email: "juliana@oficina.com",
      senha: "123456",
      cargo: "Financeiro",
      perfil: "Administrador",
      status: "Ativo",
    },
    {
      id: 5,
      nome: "Pedro Almeida",
      username: "pedro",
      email: "pedro@oficina.com",
      senha: "123456",
      cargo: "Estoquista",
      perfil: "Operador",
      status: "Inativo",
    },
  ]

  // Usar dados de exemplo se a API não retornar dados
  const displayUsuarios = usuarios.length > 0 ? usuarios : usuariosExemplo

  if (loading && usuarios.length === 0) {
    return (
      <div className="container py-6 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando usuários...</p>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      {error ? (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <Button onClick={carregarUsuarios} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Total de usuários: {displayUsuarios.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell w-[50px]">ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Usuário</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Cargo</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="hidden md:table-cell">{usuario.id}</TableCell>
                  <TableCell className="font-medium">
                    {usuario.nome}
                    <div className="md:hidden text-xs text-muted-foreground mt-1">
                      {usuario.username} • {usuario.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{usuario.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{usuario.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{usuario.cargo}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {usuario.perfil === "Administrador" ? (
                        <Badge variant="default" className="bg-red-500">
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <User className="mr-1 h-3 w-3" />
                          Operador
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {usuario.status === "Ativo" ? (
                      <Badge variant="outline" className="bg-green-500/20 text-green-700 hover:bg-green-500/20">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-500/20 text-gray-700 hover:bg-gray-500/20">
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditClick(usuario)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteClick(usuario)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo de Formulário */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUsuario ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {selectedUsuario ? "editar o" : "adicionar um novo"} usuário.
            </DialogDescription>
          </DialogHeader>
          <UsuarioForm
            usuario={selectedUsuario || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário "{selectedUsuario?.nome}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}