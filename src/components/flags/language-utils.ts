// SPDX-License-Identifier: MIT

import { languageData, type Language } from "./data/languages"
import { normalizeCountrySearch } from "./country-utils"

const byCode = new Map(languageData.map((language) => [language.code.toLocaleLowerCase(), language]))

export function getLanguage(code: string) {
  return byCode.get(code.toLocaleLowerCase())
}

export function getLanguageDirection(code: string): "ltr" | "rtl" {
  return getLanguage(code)?.direction ?? "ltr"
}

export function searchLanguages(query: string, source: readonly Language[] = languageData) {
  const normalized = normalizeCountrySearch(query)
  if (!normalized) return [...source]
  return source.filter((language) => normalizeCountrySearch(`${language.code} ${language.name} ${language.nativeName}`).includes(normalized))
}

export { languageData, type Language, type LanguageCode } from "./data/languages"
