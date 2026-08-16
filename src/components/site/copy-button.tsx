import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  value: string
  label?: string
  copiedLabel?: string
}

export function CopyButton({ value, label = "Copy", copiedLabel = "Copied", ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={copy} {...props}>
      {copied ? <IconCheck /> : <IconCopy />}
      <span>{copied ? copiedLabel : label}</span>
    </Button>
  )
}
