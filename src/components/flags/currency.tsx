// SPDX-License-Identifier: MIT

import type * as React from "react"

import { cn } from "@/lib/utils"

import { formatCurrency, getCurrency } from "./currency-utils"
import type { CurrencyCode } from "./data/currencies"

export interface CurrencyProps extends React.ComponentProps<"span"> {
  code: CurrencyCode
  display?: "code" | "name" | "symbol" | "native-symbol"
}

export function Currency({ code, display = "code", className, ...props }: CurrencyProps) {
  const currency = getCurrency(code)
  const value = display === "name" ? currency?.name
    : display === "symbol" ? currency?.symbol
      : display === "native-symbol" ? currency?.symbolNative
        : code
  return <span className={cn(display === "code" && "font-mono", className)} {...props}>{value}</span>
}

export interface CurrencyValueProps extends React.ComponentProps<"span"> {
  amount: number
  currency: CurrencyCode
  locale?: string
}

export function CurrencyValue({ amount, currency, locale, ...props }: CurrencyValueProps) {
  return <span {...props}>{formatCurrency(amount, currency, locale)}</span>
}
