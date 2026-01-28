"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/hooks/use-theme"

export function ForceLightTheme() {
  const { theme, setTheme, mounted } = useTheme()
  const previousTheme = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!mounted) {
      return
    }

    if (previousTheme.current === undefined) {
      previousTheme.current = theme ?? "system"
    }

    setTheme("light")

    return () => {
      if (previousTheme.current) {
        setTheme(previousTheme.current)
      } else {
        setTheme("system")
      }
    }
  }, [mounted, setTheme, theme])

  return null
}
