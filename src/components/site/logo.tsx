import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 font-mono text-[15px] font-semibold tracking-[-0.04em]", className)} aria-label="Flagcn home">
      <img src="/flagcn-mark.png" alt="" width="24" height="24" className="size-6 object-contain" aria-hidden="true" />
      <span><span className="text-primary" aria-hidden="true">@</span>flagcn</span>
    </Link>
  )
}
