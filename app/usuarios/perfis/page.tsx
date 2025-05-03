'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BackButton } from '@/components/ui/BackButton';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import usuarioService, { type Usuario } from '@/services/usuarioService';
import permissionService from '@/services/permissionService';

interface PerfisSelecionadosType {
  [key: number]: string;
}

export default function GerenciarPerfis() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [perfisSelecionados, setPerfisSelecionados] = useState<PerfisSelecionadosType>({});
  const [salvandoIds, setSalvandoIds] = useState<number[]>([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        setCarregando(true);
        const data = await usuarioService.listarUsuarios();
        setUsuarios(data);
        
        // Inicializar os perfis selecionados com os perfis atuais dos usuários
        const perfisIniciais: PerfisSelecionadosType = {};
        data.forEach((usuario: Usuario) => {
          perfisIniciais[usuario.id] = usuario.perfil || '';
        });
        setPerfisSelecionados(perfisIniciais);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a lista de usuários.',
          variant: 'destructive'
        });
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarios();
  }, [toast]);

  const handlePerfilChange = (usuarioId: number, perfil: string) => {
    setPerfisSelecionados(prev => ({
      ...prev,
      [usuarioId]: perfil
    }));
  };

  const handleSalvarPerfil = async (usuarioId: number) => {
    try {
      setSalvandoIds(prev => [...prev, usuarioId]);
      
      const perfil = perfisSelecionados[usuarioId];
      if (!perfil) {
        toast({
          title: 'Atenção',
          description: 'Selecione um perfil para o usuário.',
          variant: 'destructive'
        });
        return;
      }
      
      await permissionService.atribuirPerfilUsuario(usuarioId, perfil);
      
      toast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso.',
      });
      
      // Atualizar o usuário na lista local
      setUsuarios(prev => 
        prev.map(u => 
          u.id === usuarioId ? { ...u, perfil } : u
        )
      );
      
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o perfil do usuário.',
        variant: 'destructive'
      });
    } finally {
      setSalvandoIds(prev => prev.filter(id => id !== usuarioId));
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <BackButton />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">Gerenciar Perfis de Usuários</h1>
            <p className="text-gray-500">Atribua perfis de acesso aos usuários do sistema</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <CardTitle>{usuario.nome}</CardTitle>
              <p className="text-sm text-gray-500">
                {usuario.username} | {usuario.email} | {usuario.cargo}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">Perfil atual: <span className="font-bold">{usuario.perfil || 'Não definido'}</span></p>
                  <Select 
                    value={perfisSelecionados[usuario.id] || ''} 
                    onValueChange={(value) => handlePerfilChange(usuario.id, value)}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMINISTRADOR">Administrador</SelectItem>
                      <SelectItem value="GERENTE">Gerente</SelectItem>
                      <SelectItem value="VENDEDOR">Vendedor</SelectItem>
                      <SelectItem value="OPERADOR">Operador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button 
                    onClick={() => handleSalvarPerfil(usuario.id)}
                    disabled={salvandoIds.includes(usuario.id)}
                  >
                    {salvandoIds.includes(usuario.id) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Salvar Perfil'
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push(`/usuarios/permissoes/${usuario.id}`)}
                  >
                    Gerenciar Permissões
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}