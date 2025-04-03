"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarWithFallbackProps {
  name: string
  src?: string
  className?: string
}

export function AvatarWithFallback({ name, src, className }: AvatarWithFallbackProps) {
  // Função para gerar as iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Função para gerar uma cor baseada no nome
  const getColorFromName = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = Math.abs(hash % 360)
    return `hsl(${hue}, 65%, 95%)`
  }

  const initials = getInitials(name)
  const bgColor = getColorFromName(name)

  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback style={{ backgroundColor: bgColor, color: `hsl(${parseInt(bgColor.split(",")[0].replace("hsl(", ""))}, 65%, 40%)` }}>
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}