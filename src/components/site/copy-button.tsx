import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick" | "value"> {
  value: string | (() => string | Promise<string>)
  label?: string
  copiedLabel?: string
  idleIcon?: typeof IconCopy
  hideLabel?: boolean
  labelClassName?: string
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  idleIcon: IdleIcon = IconCopy,
  hideLabel = false,
  labelClassName,
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
      {hideLabel ? null : (
        <span className={cn("inline-grid min-w-12 place-items-center", labelClassName)}>
          <span className="col-start-1 row-start-1">{copied ? copiedLabel : label}</span>
        </span>
      )}
      <span className="sr-only" aria-live="polite">{copied ? copiedLabel : ""}</span>
    </Button>
  )
}
