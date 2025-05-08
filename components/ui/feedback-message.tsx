"use client"

import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type FeedbackType = "success" | "error" | "info" | "warning"

interface FeedbackMessageProps {
  type: FeedbackType
  title?: string
  message: string
  className?: string
  onDismiss?: () => void
}

export function FeedbackMessage({ type, title, message, className, onDismiss }: FeedbackMessageProps) {
  // Mapear tipo para classes de cor
  const colorClassMap: Record<FeedbackType, string> = {
    success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  }

  // Mapear tipo para ícone
  const IconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const Icon = IconMap[type]

  return (
    <div className={cn("flex items-start gap-3 rounded-md border p-4", colorClassMap[type], className)}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        {title && <h4 className="mb-1 font-medium">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto -mr-1 -mt-1 h-6 w-6 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
