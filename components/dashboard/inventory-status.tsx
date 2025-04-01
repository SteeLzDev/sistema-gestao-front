import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados simulados para produtos com estoque baixo
const lowStockProducts = [
  {
    id: 1,
    name: "Óleo de Motor 5W30",
    category: "Lubrificantes",
    price: 39.9,
    stock: 3,
    minStock: 5,
  },
  {
    id: 2,
    name: "Filtro de Ar - Modelo X",
    category: "Filtros",
    price: 25.5,
    stock: 2,
    minStock: 10,
  },
  {
    id: 3,
    name: "Pastilha de Freio - Modelo Y",
    category: "Freios",
    price: 89.9,
    stock: 4,
    minStock: 8,
  },
  {
    id: 4,
    name: "Bateria 60Ah",
    category: "Elétrica",
    price: 349.9,
    stock: 1,
    minStock: 3,
  },
  {
    id: 5,
    name: "Lâmpada de Farol H7",
    category: "Iluminação",
    price: 15.9,
    stock: 4,
    minStock: 15,
  },
]

export function InventoryStatus() {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Produtos com Estoque Baixo</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lowStockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={product.stock <= product.minStock / 3 ? "destructive" : "outline"}
                  className="whitespace-nowrap"
                >
                  {product.stock <= product.minStock / 3 ? "Crítico" : "Baixo"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

