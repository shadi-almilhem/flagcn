import * as React from "react"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative inline-flex">
      <select
        data-slot="native-select"
        className={cn(
          "border-input bg-background h-9 appearance-none rounded-md border py-1 ps-3 pe-8 text-sm shadow-xs outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <IconChevronDown aria-hidden="true" className="text-muted-foreground pointer-events-none absolute end-2 top-1/2 size-4 -translate-y-1/2" />
    </div>
  )
}

export { NativeSelect }
