import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

export function CodeBlock({ code, language = "tsx", className }: { code: string; language?: string; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden border bg-code text-code-foreground", className)}>
      <div className="flex h-9 items-center justify-between border-b border-border/60 px-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{language}</span>
        <CopyButton value={code} label="Copy" className="h-7 text-muted-foreground hover:text-foreground" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6"><code>{code}</code></pre>
    </div>
  )
}
