// SPDX-License-Identifier: MIT

import type { CountryCode } from "../data/countries"

/** Current European Union member states. */
export const euCountryCodes = [
  "at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "ie",
  "it", "lv", "lt", "lu", "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se",
] as const satisfies readonly CountryCode[]
export type EuCountryCode = (typeof euCountryCodes)[number]

export function isEuCountry(code: string): code is EuCountryCode {
  return (euCountryCodes as readonly string[]).includes(code.toLocaleLowerCase())
}
