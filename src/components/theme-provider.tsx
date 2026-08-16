import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

const themeColors = {
  dark: "#181916",
  light: "#ffffff",
} as const

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="flagcn-theme"
    >
      <ThemeRuntime />
      {children}
    </NextThemesProvider>
  )
}

function ThemeRuntime() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    const theme = resolvedTheme === "light" ? "light" : "dark"
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", themeColors[theme])
  }, [resolvedTheme])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (
        event.defaultPrevented
        || event.repeat
        || event.altKey
        || target?.matches("input, textarea, select, [contenteditable='true']")
      ) return

      const directShortcut = event.key.toLowerCase() === "d" && !event.metaKey && !event.ctrlKey && !event.shiftKey
      const modifiedShortcut = event.key.toLowerCase() === "d" && (event.metaKey || event.ctrlKey) && event.shiftKey
      if (!directShortcut && !modifiedShortcut) return

      event.preventDefault()
      setTheme(resolvedTheme === "light" ? "dark" : "light")
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme, setTheme])

  return null
}
