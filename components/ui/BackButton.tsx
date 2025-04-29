"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  to?: string
  label?: string
  className?: string
}

export const BackButton = ({
  to = "/dashboard",
  label = "Voltar para Dashboard",
  className = "",
}: BackButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(to)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={`flex items-center gap-1 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  )
}
