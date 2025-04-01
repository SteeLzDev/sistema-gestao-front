"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Dados simulados para o gráfico
const data = [
  {
    name: "Jan",
    total: 8400,
  },
  {
    name: "Fev",
    total: 7300,
  },
  {
    name: "Mar",
    total: 9800,
  },
  {
    name: "Abr",
    total: 8900,
  },
  {
    name: "Mai",
    total: 11200,
  },
  {
    name: "Jun",
    total: 9300,
  },
  {
    name: "Jul",
    total: 10800,
  },
  {
    name: "Ago",
    total: 12500,
  },
  {
    name: "Set",
    total: 11900,
  },
  {
    name: "Out",
    total: 13100,
  },
  {
    name: "Nov",
    total: 12400,
  },
  {
    name: "Dez",
    total: 14800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `R$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Total"]}
          labelFormatter={(label: string) => `Mês: ${label}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

