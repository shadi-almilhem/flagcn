// SPDX-License-Identifier: MIT

import {
  countryData,
  phoneCountryCodes,
  type Country,
  type CountryCode,
  type PhoneCountryCode,
} from "./data/countries"

const byCode = new Map(countryData.map((country) => [country.code, country]))
const byAlpha2 = new Map(countryData.map((country) => [country.alpha2.toLowerCase(), country]))
const byAlpha3 = new Map(countryData.map((country) => [country.alpha3.toLowerCase(), country]))
const phoneCodeSet = new Set<string>(phoneCountryCodes)

export function normalizeCountrySearch(value: string) {
  return value.normalize("NFKD").replace(/\p{Diacritic}/gu, "").trim().toLocaleLowerCase()
}

export function isCountryCode(value: string): value is CountryCode {
  return byCode.has(value.toLocaleLowerCase() as CountryCode)
}

export function getCountry(code: string) {
  return byCode.get(code.toLocaleLowerCase() as CountryCode)
}

export function getCountryByAlpha2(alpha2: string) {
  return byAlpha2.get(alpha2.trim().toLocaleLowerCase())
}

export function getCountryByAlpha3(alpha3: string) {
  return byAlpha3.get(alpha3.trim().toLocaleLowerCase())
}

export function isPhoneCountryCode(value: string): value is PhoneCountryCode {
  return phoneCodeSet.has(value.trim().toLocaleLowerCase())
}

export function searchCountries(query: string, source: readonly Country[] = countryData) {
  const normalized = normalizeCountrySearch(query)
  if (!normalized) return [...source]

  return source.filter((country) => normalizeCountrySearch([
    country.name,
    country.nativeName,
    country.alpha2,
    country.alpha3,
    country.numeric,
    country.capital,
    ...country.aliases,
    ...country.callingCodes,
    ...country.currencies,
    ...country.languages,
  ].join(" ")).includes(normalized))
}

export function countryCodeToEmoji(code: string) {
  const alpha2 = code.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(alpha2)) return undefined
  return alpha2.replace(/[A-Z]/g, (letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397))
}

export function emojiToCountryCode(emoji: string) {
  const points = [...emoji.trim()].map((character) => character.codePointAt(0))
  if (points.length !== 2 || points.some((point) => point === undefined || point < 127462 || point > 127487)) return undefined
  const code = points.map((point) => String.fromCharCode((point ?? 127462) - 127397)).join("").toLocaleLowerCase()
  return isCountryCode(code) ? code : undefined
}

export function getCountryCallingCodes(code: string) {
  return getCountry(code)?.callingCodes ?? []
}

export function getCountriesByCallingCode(callingCode: string) {
  const digits = callingCode.trim().replace(/^\+/, "").replace(/[\s()-]/g, "")
  if (!/^\d{1,3}$/.test(digits)) return []
  const normalized = `+${digits}`
  return countryData.filter((country) => country.callingCodes.includes(normalized as never))
}

export {
  countryData,
  phoneCountryCodes,
  type Country,
  type CountryCode,
  type PhoneCountryCode,
} from "./data/countries"
export { countryDataMeta } from "./data/countries"
