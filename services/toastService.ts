// Serviço de toast para uso fora de componentes React
let toastFn: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => void = () =>
    console.warn("Toast não inicializado")
  
  const toastService = {
    // Função para registrar o toast real quando um componente React é montado
    register: (toast: typeof toastFn) => {
      toastService.toast = toast
      toastFn = toast
    },
  
    // Função para mostrar um toast
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      toastFn(props)
    },
  
    // Função para mostrar um toast de erro
    error: (title: string, description?: string) => {
      toastFn({ title, description, variant: "destructive" })
    },
  
    // Função para mostrar um toast de sucesso
    success: (title: string, description?: string) => {
      toastFn({ title, description })
    },
  }
  
  export default toastService
  