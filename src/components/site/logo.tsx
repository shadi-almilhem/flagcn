import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 font-sans text-base font-semibold tracking-[-0.025em]", className)} aria-label="Flagcn home">
      <img src="/flagcn-mark-v2.png" alt="" width="28" height="28" className="size-7 object-contain" aria-hidden="true" />
      <span>Flagcn</span>
    </Link>
  )
}
