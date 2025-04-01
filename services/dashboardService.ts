import apiClient from "./apiClient";
import { produtoService } from "./api";
import { vendaService } from "./api";
import { filaService } from "./api";

export interface DashboardData {
  totalSales: number;
  salesGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  totalProducts: number;
  lowStockProducts: number;
  queueWaiting: number;
  queueInService: number;
}

export interface SalesData {
  name: string;
  total: number;
}

export interface RecentSale {
  id: number;
  customer: string;
  email: string;
  amount: number;
  date: string;
  status: string;
}

export interface LowStockProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
}

export interface QueueItem {
  id: number;
  customer: string;
  service: string;
  status: string;
  arrivalTime: string;
  priority: string;
}

// Dados mockados para usar enquanto os endpoints reais não estão disponíveis
const mockDashboardData: DashboardData = {
  totalSales: 12890.75,
  salesGrowth: 14.5,
  totalCustomers: 342,
  customersGrowth: 7.2,
  totalProducts: 189,
  lowStockProducts: 12,
  queueWaiting: 8,
  queueInService: 3,
};

const mockMonthlySales: SalesData[] = [
  { name: "Jan", total: 8400 },
  { name: "Fev", total: 7300 },
  { name: "Mar", total: 9800 },
  { name: "Abr", total: 8900 },
  { name: "Mai", total: 11200 },
  { name: "Jun", total: 9300 },
  { name: "Jul", total: 10800 },
  { name: "Ago", total: 12500 },
  { name: "Set", total: 11900 },
  { name: "Out", total: 13100 },
  { name: "Nov", total: 12400 },
  { name: "Dez", total: 14800 },
];

const mockRecentSales: RecentSale[] = [
  {
    id: 1,
    customer: "João Silva",
    email: "joao.silva@example.com",
    amount: 259.99,
    date: "2023-11-15T14:32:00Z",
    status: "completed",
  },
  {
    id: 2,
    customer: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    amount: 478.5,
    date: "2023-11-15T10:15:00Z",
    status: "completed",
  },
  {
    id: 3,
    customer: "Pedro Santos",
    email: "pedro.santos@example.com",
    amount: 189.9,
    date: "2023-11-14T16:45:00Z",
    status: "completed",
  },
  {
    id: 4,
    customer: "Ana Costa",
    email: "ana.costa@example.com",
    amount: 325.75,
    date: "2023-11-14T09:20:00Z",
    status: "completed",
  },
  {
    id: 5,
    customer: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    amount: 592.3,
    date: "2023-11-13T15:10:00Z",
    status: "completed",
  },
];

export const dashboardService = {
  // Obter dados gerais do dashboard
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      // Obter dados do endpoint específico
      const response = await apiClient.get("/dashboard");
      const data = response.data;
      
      // Mapear os dados do backend para o formato esperado pelo frontend
      return {
        totalSales: data.vendasRecentes?.total || 0,
        salesGrowth: 14.5, // Valor fixo por enquanto
        totalCustomers: 342, // Valor fixo por enquanto
        customersGrowth: 7.2, // Valor fixo por enquanto
        totalProducts: data.estoque?.total || 0,
        lowStockProducts: data.estoque?.baixoEstoque || 0,
        queueWaiting: data.fila?.aguardando || 0,
        queueInService: data.fila?.emAtendimento || 0,
      };
    } catch (error) {
      console.error("Erro ao obter dados do dashboard:", error);
      // Retornar dados mockados em caso de erro
      return mockDashboardData;
    }
  },

  // Obter dados de vendas mensais
  getMonthlySales: async (): Promise<SalesData[]> => {
    try {
      // Obter relatório mensal
      const response = await apiClient.get("/dashboard/relatorio/mensal");
      const data = response.data;
      
      // Mapear vendas por dia para o formato esperado pelo gráfico
      const vendasPorDia = data.vendasPorDia || {};
      
      // Agrupar por mês
      const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const vendasPorMes: SalesData[] = meses.map(mes => ({ name: mes, total: 0 }));
      
      // Preencher com dados reais se disponíveis
      Object.entries(vendasPorDia).forEach(([data, valor]) => {
        const mes = new Date(data).getMonth();
        vendasPorMes[mes].total += Number(valor);
      });
      
      return vendasPorMes;
    } catch (error) {
      console.error("Erro ao obter vendas mensais:", error);
      // Retornar dados mockados em caso de erro
      return mockMonthlySales;
    }
  },

  // Obter vendas recentes
  getRecentSales: async (): Promise<RecentSale[]> => {
    try {
      // Obter dados do dashboard
      const response = await apiClient.get("/dashboard");
      const data = response.data;
      
      // Mapear vendas recentes para o formato esperado pelo frontend
      if (data.vendasRecentes?.itens && data.vendasRecentes.itens.length > 0) {
        return data.vendasRecentes.itens.map((venda: any) => ({
          id: venda.id,
          customer: venda.cliente,
          email: "cliente@exemplo.com", // O backend não retorna email
          amount: venda.valorTotal,
          date: venda.dataHora,
          status: "completed",
        }));
      }
      
      // Se não houver dados, retornar mock
      return mockRecentSales;
    } catch (error) {
      console.error("Erro ao obter vendas recentes:", error);
      // Retornar dados mockados em caso de erro
      return mockRecentSales;
    }
  },

  // Obter produtos com estoque baixo
  getLowStockProducts: async (): Promise<LowStockProduct[]> => {
    try {
      // Obter dados do dashboard
      const response = await apiClient.get("/dashboard");
      const data = response.data;
      
      // Mapear produtos com estoque baixo para o formato esperado pelo frontend
      if (data.estoque?.itens && data.estoque.itens.length > 0) {
        return data.estoque.itens.map((produto: any) => ({
          id: produto.id,
          name: produto.nome,
          category: "Categoria", // O backend não retorna categoria
          price: produto.preco,
          stock: produto.quantidade,
          minStock: 5, // Valor fixo por enquanto
        }));
      }
      
      // Se não houver dados, retornar array vazio
      return [];
    } catch (error) {
      console.error("Erro ao obter produtos com estoque baixo:", error);
      // Retornar array vazio em caso de erro
      return [];
    }
  },

  // Obter dados da fila de atendimento
  getServiceQueue: async (): Promise<QueueItem[]> => {
    try {
      // Obter dados do dashboard
      const response = await apiClient.get("/dashboard");
      const data = response.data;
      
      // Mapear clientes na fila para o formato esperado pelo frontend
      if (data.fila?.itens && data.fila.itens.length > 0) {
        return data.fila.itens.map((cliente: any) => ({
          id: cliente.id,
          customer: cliente.nome,
          service: cliente.servico,
          status: cliente.status.toLowerCase(),
          arrivalTime: cliente.chegada,
          priority: "normal", // O backend não retorna prioridade
        }));
      }
      
      // Se não houver dados, retornar array vazio
      return [];
    } catch (error) {
      console.error("Erro ao obter dados da fila de atendimento:", error);
      // Retornar array vazio em caso de erro
      return [];
    }
  },
};

export default dashboardService;