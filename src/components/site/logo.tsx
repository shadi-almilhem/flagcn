import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Flagcn home">
      <span className="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 20V4.5m.5 1h10.5l-2.8 3 2.8 3H7" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">Flagcn</span>
    </Link>
  )
}
