import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = resolvedTheme === "light"
  const nextTheme = isLight ? "dark" : "light"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme (D)`}
      onClick={() => setTheme(nextTheme)}
    >
      <span
        className="t-icon-swap"
        data-state={isLight ? "b" : "a"}
        data-icon="inline-start"
        aria-hidden="true"
      >
        <span className="t-icon" data-icon="a"><IconSun /></span>
        <span className="t-icon" data-icon="b"><IconMoon /></span>
      </span>
    </Button>
  )
}
