export default function HomePage() {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Bem-vindo à Oficina!</h1>
        <p className="mt-2 text-muted-foreground">
          Acesse a <a href="/dashboard" className="underline text-blue-600">Dashboard</a> para gerenciar seu sistema.
        </p>
      </main>
    )
  }
  