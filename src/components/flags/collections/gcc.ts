// SPDX-License-Identifier: MIT

import type { CountryCode } from "../data/countries"

/** Current Gulf Cooperation Council member states. */
export const gccCountryCodes = ["ae", "bh", "sa", "om", "qa", "kw"] as const satisfies readonly CountryCode[]
export type GccCountryCode = (typeof gccCountryCodes)[number]

export function isGccCountry(code: string): code is GccCountryCode {
  return (gccCountryCodes as readonly string[]).includes(code.toLocaleLowerCase())
}
