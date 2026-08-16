import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

export function CodeBlock({ code, language = "tsx", className }: { code: string; language?: string; className?: string }) {
  return (
    <div className={cn("bg-code text-code-foreground group relative overflow-hidden rounded-lg border border-white/8", className)}>
      <div className="flex h-9 items-center justify-between border-b border-white/8 px-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/38">{language}</span>
        <CopyButton value={code} label="Copy" className="h-7 text-white/55 hover:bg-white/8 hover:text-white" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6"><code>{code}</code></pre>
    </div>
  )
}
