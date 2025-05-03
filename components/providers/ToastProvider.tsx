"use client"

import type React from "react"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import toastService from "@/services/toastService"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  useEffect(() => {
    // Registrar a função toast no serviço
    toastService.register(toast)
  }, [toast])

  return <>{children}</>
}
