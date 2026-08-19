import { describe, expect, it } from "vitest"

import {
  countryCodeToEmoji,
  countryDataMeta,
  emojiToCountryCode,
  getCountriesByCallingCode,
  getCountry,
  isPhoneCountryCode,
  phoneCountryCodes,
  searchCountries,
} from "./country-utils"

describe("country utilities", () => {
  it("round-trips country codes and emoji", () => {
    expect(countryCodeToEmoji("AE")).toBe("🇦🇪")
    expect(emojiToCountryCode("🇦🇪")).toBe("ae")
    expect(emojiToCountryCode("🙂")).toBeUndefined()
  })

  it("searches aliases, alpha-3 codes, and currencies", () => {
    expect(searchCountries("UAE").some((country) => country.code === "ae")).toBe(true)
    expect(searchCountries("ARE").some((country) => country.code === "ae")).toBe(true)
    expect(searchCountries("AED").some((country) => country.code === "ae")).toBe(true)
    expect(getCountry("AE")?.name).toBe("United Arab Emirates")
  })

  it("returns every country sharing a calling code", () => {
    const matches = getCountriesByCallingCode("+1")
    expect(matches.length).toBeGreaterThan(1)
    expect(matches.some((country) => country.code === "us")).toBe(true)
    expect(matches.some((country) => country.code === "ca")).toBe(true)
    expect(getCountriesByCallingCode("+ 1")).toHaveLength(matches.length)
    expect(getCountriesByCallingCode("not-a-code")).toEqual([])
  })

  it("exposes validated source metadata and a phone-safe subset", () => {
    expect(countryDataMeta.validated).toBe(true)
    expect(countryDataMeta.countryCount).toBe(250)
    expect(phoneCountryCodes).toHaveLength(countryDataMeta.phoneCountryCount)
    expect(isPhoneCountryCode("ae")).toBe(true)
    expect(isPhoneCountryCode("aq")).toBe(false)
  })
})
