"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid gray",
        cursor: "pointer",
        background: "transparent",
      }}
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  )
}