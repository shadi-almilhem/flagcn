// SPDX-License-Identifier: MIT

import type * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { getCountry } from "./country-utils"
import type { CountryCode } from "./data/countries"
import { Flag } from "./flag"

export interface CountryBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "children"> {
  code: CountryCode
  label?: "name" | "code" | "calling-code" | "none"
}

export function CountryBadge({ code, label = "name", className, ...props }: CountryBadgeProps) {
  const country = getCountry(code)
  const text = label === "code" ? code.toUpperCase()
    : label === "calling-code" ? country?.callingCodes[0]
      : label === "name" ? country?.name
        : undefined

  return (
    <Badge className={cn("gap-1.5", className)} {...props}>
      <Flag code={code} width={24} ratio="4x3" alt="" decorative className="h-3 w-4 object-cover ring-1 ring-black/10 dark:ring-white/15" />
      {text ? <span>{text}</span> : null}
    </Badge>
  )
}
