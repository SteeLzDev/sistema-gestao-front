import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AvatarWithFallbackProps {
  name: string
  className?: string
}

export function AvatarWithFallback({ name, className }: AvatarWithFallbackProps) {
  // Gera uma cor de fundo baseada no nome
  const stringToColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = "#"
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += ("00" + value.toString(16)).substr(-2)
    }
    return color
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const bgColor = stringToColor(name)

  return (
    <Avatar className={className}>
      <AvatarFallback style={{ backgroundColor: bgColor, color: "#fff" }}>{initials}</AvatarFallback>
    </Avatar>
  )
}

