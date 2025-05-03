"use client"

import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

const TooltipContext = React.createContext<{
  delayDuration: number
}>({
  delayDuration: 700,
})

export function TooltipProvider({ children, delayDuration = 700 }: TooltipProviderProps) {
  return <TooltipContext.Provider value={{ delayDuration }}>{children}</TooltipContext.Provider>
}

interface TooltipProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: TooltipProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : open

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <TooltipContext.Provider value={{ delayDuration: 700 }}>
      <TooltipPrimitive isOpen={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </TooltipPrimitive>
    </TooltipContext.Provider>
  )
}

interface TooltipPrimitiveProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function TooltipPrimitive({ children, isOpen, onOpenChange }: TooltipPrimitiveProps) {
  return (
    <TooltipContext.Provider value={{ delayDuration: 700 }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onOpenChange,
          })
        }
        return child
      })}
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = false, isOpen, onOpenChange, ...props }, forwardedRef) => {
    const [open, setOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const childRef = useRef<HTMLElement>(null)
    const tooltipContext = React.useContext(TooltipContext)

    // Combine refs
    const ref = React.useMemo(() => {
      if (forwardedRef) {
        return (node: HTMLElement | null) => {
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
          childRef.current = node
        }
      }
      return childRef
    }, [forwardedRef])

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setOpen(true)
        onOpenChange?.(true)
      }, tooltipContext.delayDuration)
    }

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setOpen(false)
      onOpenChange?.(false)
    }

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    const child = asChild ? (
      children
    ) : (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        {...props}
      >
        {children}
      </span>
    )

    if (React.isValidElement(child) && asChild) {
      return React.cloneElement(child as React.ReactElement<any>, {
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleMouseEnter,
        onBlur: handleMouseLeave,
        ...props,
      })
    }

    return child
  },
)

TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  sideOffset?: number
  isOpen?: boolean
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, sideOffset = 4, isOpen, ...props }, ref) => {
    const [mounted, setMounted] = useState(false)
    const triggerRef = React.useContext(TooltipContext)

    useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])

    if (!mounted || !isOpen) {
      return null
    }

    return createPortal(
      <div
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md animate-in fade-in-0 zoom-in-95 absolute",
          className,
        )}
        style={{
          top: "calc(100% + 5px)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        {...props}
      >
        {children}
      </div>,
      document.body,
    )
  },
)

TooltipContent.displayName = "TooltipContent"
