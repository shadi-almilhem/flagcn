// SPDX-License-Identifier: MIT

import type * as React from "react"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

import { countryData, type CountryCode } from "./data/countries"

export interface CountrySelectProps extends Omit<React.ComponentProps<typeof NativeSelect>, "value" | "defaultValue" | "onChange"> {
  value?: CountryCode
  defaultValue?: CountryCode
  onValueChange?: (code: CountryCode) => void
  countries?: readonly CountryCode[]
  placeholder?: string
  showCallingCode?: boolean
}

export function CountrySelect({
  value,
  defaultValue,
  onValueChange,
  countries,
  placeholder = "Select a country",
  showCallingCode = false,
  ...props
}: CountrySelectProps) {
  const allowed = countries ? new Set(countries) : undefined
  const options = allowed ? countryData.filter((country) => allowed.has(country.code)) : countryData

  return (
    <NativeSelect
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onValueChange?.(event.target.value as CountryCode)}
      {...props}
    >
      <NativeSelectOption value="" disabled>{placeholder}</NativeSelectOption>
      {options.map((country) => (
        <NativeSelectOption key={country.code} value={country.code}>
          {country.emoji} {country.name}{showCallingCode ? ` (${country.callingCodes[0] ?? ""})` : ""}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
