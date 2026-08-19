import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { copyTextToClipboard } from "@/lib/copy-text"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "value"> {
  value: string | (() => string | Promise<string>)
  label?: string
  copiedLabel?: string
  idleIcon?: typeof IconCopy
  hideLabel?: boolean
  labelClassName?: string
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  idleIcon: IdleIcon = IconCopy,
  hideLabel = false,
  labelClassName,
  onClick,
  ...props
}, ref) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle")

  async function copy(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return

    try {
      const nextValue = typeof value === "function" ? await value() : value
      await copyTextToClipboard(nextValue)
      setStatus("copied")
      window.setTimeout(() => setStatus("idle"), 1600)
    } catch {
      setStatus("error")
      toast.error("Copy failed", {
        description: "Your browser did not allow clipboard access.",
      })
      window.setTimeout(() => setStatus("idle"), 2200)
    }
  }

  const copied = status === "copied"
  const visibleLabel = copied ? copiedLabel : status === "error" ? "Copy failed" : label

  return (
    <Button ref={ref} type="button" variant="ghost" size="sm" onClick={copy} {...props}>
      <span className="t-icon-swap" data-state={copied ? "b" : "a"} data-icon="inline-start" aria-hidden="true">
        <span className="t-icon" data-icon="a"><IdleIcon /></span>
        <span className="t-icon" data-icon="b"><IconCheck /></span>
      </span>
      {hideLabel ? null : (
        <span className={cn("inline-grid min-w-12 place-items-center", labelClassName)}>
          <span className="col-start-1 row-start-1">{visibleLabel}</span>
        </span>
      )}
      <span className="sr-only" aria-live="polite">{status === "idle" ? "" : visibleLabel}</span>
    </Button>
  )
})
