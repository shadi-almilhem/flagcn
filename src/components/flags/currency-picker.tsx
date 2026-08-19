// SPDX-License-Identifier: MIT

import { Badge } from "@/components/ui/badge"
import * as React from "react"

import { currencyData, type CurrencyCode } from "./data/currencies"
import { SearchPicker, type SearchPickerProps } from "./search-picker"

export interface CurrencyPickerProps extends Omit<SearchPickerProps, "items" | "value" | "defaultValue" | "onValueChange" | "placeholder" | "searchPlaceholder" | "emptyMessage"> {
  value?: CurrencyCode
  defaultValue?: CurrencyCode
  onValueChange?: (code: CurrencyCode) => void
  currencies?: readonly CurrencyCode[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function CurrencyPicker({
  currencies,
  placeholder = "Select a currency",
  searchPlaceholder = "Search currencies…",
  emptyMessage = "No currencies found.",
  onValueChange,
  ...props
}: CurrencyPickerProps) {
  const items = React.useMemo(() => {
    const allowed = currencies ? new Set(currencies) : undefined
    return currencyData.filter((currency) => !allowed || allowed.has(currency.code)).map((currency) => ({
      value: currency.code,
      label: `${currency.code} — ${currency.name}`,
      description: currency.native,
      searchValue: `${currency.symbol} ${currency.symbolNative}`,
      trailing: <Badge variant="outline" className="min-w-8 justify-center font-mono">{currency.symbol}</Badge>,
    }))
  }, [currencies])

  return <SearchPicker items={items} placeholder={placeholder} searchPlaceholder={searchPlaceholder} emptyMessage={emptyMessage} onValueChange={(code) => onValueChange?.(code as CurrencyCode)} {...props} />
}
