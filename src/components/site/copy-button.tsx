import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick" | "value"> {
  value: string | (() => string | Promise<string>)
  label?: string
  copiedLabel?: string
  idleIcon?: typeof IconCopy
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  idleIcon: IdleIcon = IconCopy,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    const nextValue = typeof value === "function" ? await value() : value
    await navigator.clipboard.writeText(nextValue)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={copy} {...props}>
      <span className="t-icon-swap" data-state={copied ? "b" : "a"} data-icon="inline-start" aria-hidden="true">
        <span className="t-icon" data-icon="a"><IdleIcon /></span>
        <span className="t-icon" data-icon="b"><IconCheck /></span>
      </span>
      <span>{copied ? copiedLabel : label}</span>
      <span className="sr-only" aria-live="polite">{copied ? copiedLabel : ""}</span>
    </Button>
  )
}
