// SPDX-License-Identifier: MIT

import { currencyData, type Currency } from "./data/currencies"
import { normalizeCountrySearch } from "./country-utils"

const byCode = new Map(currencyData.map((currency) => [currency.code.toLocaleUpperCase(), currency]))

export function getCurrency(code: string) {
  return byCode.get(code.toLocaleUpperCase())
}

export function searchCurrencies(query: string, source: readonly Currency[] = currencyData) {
  const normalized = normalizeCountrySearch(query)
  if (!normalized) return [...source]
  return source.filter((currency) => normalizeCountrySearch(`${currency.code} ${currency.name} ${currency.native} ${currency.symbol} ${currency.symbolNative}`).includes(normalized))
}

export function formatCurrency(amount: number, currency: string, locale?: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: currency.toLocaleUpperCase() }).format(amount)
}

export { currencyData, type Currency, type CurrencyCode } from "./data/currencies"
