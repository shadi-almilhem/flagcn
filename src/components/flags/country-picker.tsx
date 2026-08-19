// SPDX-License-Identifier: MIT

import type { ComponentProps } from "react"

import { countryData, type CountryCode } from "./data/countries"
import { FlagPicker } from "./flag-picker"

export interface CountryPickerProps extends Omit<ComponentProps<typeof FlagPicker>, "value" | "defaultValue" | "onValueChange" | "codes" | "kinds"> {
  value?: CountryCode
  defaultValue?: CountryCode
  onValueChange?: (code: CountryCode) => void
  countries?: readonly CountryCode[]
}

export function CountryPicker({ countries = countryData.map((country) => country.code), onValueChange, ...props }: CountryPickerProps) {
  return (
    <FlagPicker
      kinds={["country"]}
      codes={countries}
      placeholder="Select a country"
      searchPlaceholder="Search country, ISO, or calling code…"
      emptyMessage="No countries found."
      onValueChange={(code) => onValueChange?.(code as CountryCode)}
      {...props}
    />
  )
}
