import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center font-mono text-[15px] font-semibold tracking-[-0.04em]", className)} aria-label="Flagcn home">
      <span className="text-primary" aria-hidden="true">@</span>flagcn
    </Link>
  )
}
