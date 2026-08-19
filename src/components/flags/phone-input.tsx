// SPDX-License-Identifier: MIT

import {
  AsYouType,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode as LibPhoneCountryCode,
} from "libphonenumber-js/max"
import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { CountryPicker } from "./country-picker"
import { isPhoneCountryCode } from "./country-utils"
import { phoneCountryCodes, type PhoneCountryCode } from "./data/countries"

export interface PhoneValueMeta {
  country: PhoneCountryCode
  formatted: string
  e164?: string
  nationalNumber?: string
  countryCallingCode?: string
  international?: string
  possible: boolean
  valid: boolean
}

export interface PhoneInputProps extends Omit<React.ComponentProps<typeof Input>, "value" | "defaultValue" | "onChange" | "size"> {
  value?: string
  defaultValue?: string
  country?: PhoneCountryCode
  defaultCountry?: PhoneCountryCode
  onCountryChange?: (country: PhoneCountryCode) => void
  onValueChange?: (value: string, meta: PhoneValueMeta) => void
  countries?: readonly PhoneCountryCode[]
  countryPickerLabel?: string
  displayFormat?: "national" | "international"
  size?: "sm" | "default" | "lg"
  inputClassName?: string
}

function phoneCountry(code: PhoneCountryCode) {
  return code.toUpperCase() as LibPhoneCountryCode
}

function normalizeInternationalPrefix(value: string) {
  return value.trimStart().startsWith("00") ? value.replace(/^\s*00/, "+") : value
}

function parsePhone(value: string, country: PhoneCountryCode) {
  return parsePhoneNumberFromString(normalizeInternationalPrefix(value), phoneCountry(country))
}

function inferCountry(value: string) {
  const parsed = parsePhoneNumberFromString(normalizeInternationalPrefix(value))
  const inferred = parsed?.country?.toLocaleLowerCase()
  return inferred && isPhoneCountryCode(inferred) ? inferred : undefined
}

function phoneMeta(value: string, country: PhoneCountryCode): PhoneValueMeta {
  const parsed = parsePhone(value, country)
  return {
    country,
    formatted: value,
    e164: parsed?.number,
    nationalNumber: parsed?.nationalNumber,
    countryCallingCode: parsed?.countryCallingCode ? `+${parsed.countryCallingCode}` : undefined,
    international: parsed?.formatInternational(),
    possible: value.length > 0 && isPossiblePhoneNumber(value, phoneCountry(country)),
    valid: value.length > 0 && isValidPhoneNumber(value, phoneCountry(country)),
  }
}

function displayValue(value: string, country: PhoneCountryCode, format: "national" | "international") {
  if (!value) return value
  const parsed = parsePhone(value, country)
  if (!parsed) return value
  return format === "international" ? parsed.formatInternational() : parsed.formatNational()
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput({
  value,
  defaultValue = "",
  country,
  defaultCountry = "us",
  onCountryChange,
  onValueChange,
  countries = phoneCountryCodes,
  countryPickerLabel = "Country calling code",
  displayFormat = "national",
  size = "default",
  className,
  inputClassName,
  disabled,
  readOnly,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  ...props
}, ref) {
  const initialCountry = inferCountry(defaultValue) ?? defaultCountry
  const [internalValue, setInternalValue] = React.useState(() => displayValue(defaultValue, initialCountry, displayFormat))
  const [internalCountry, setInternalCountry] = React.useState<PhoneCountryCode>(initialCountry)
  const inferredControlledCountry = value ? inferCountry(value) : undefined
  const currentCountry = country ?? inferredControlledCountry ?? internalCountry
  const currentValue = value === undefined ? internalValue : displayValue(value, currentCountry, displayFormat)

  function updateCountry(nextCountry: PhoneCountryCode) {
    if (country === undefined) setInternalCountry(nextCountry)
    onCountryChange?.(nextCountry)

    if (!currentValue) return
    const nextDisplay = displayValue(currentValue, nextCountry, displayFormat)
    if (value === undefined) setInternalValue(nextDisplay)
    const meta = phoneMeta(nextDisplay, nextCountry)
    onValueChange?.(meta.e164 ?? nextDisplay, meta)
  }

  function updateValue(raw: string) {
    const normalized = normalizeInternationalPrefix(raw)
    const formatter = new AsYouType(normalized.startsWith("+") ? undefined : phoneCountry(currentCountry))
    const formatted = formatter.input(normalized)
    const inferred = formatter.getCountry()?.toLocaleLowerCase()
    const nextCountry = inferred && isPhoneCountryCode(inferred) ? inferred : currentCountry

    if (value === undefined) setInternalValue(formatted)
    if (country === undefined && nextCountry !== internalCountry) {
      setInternalCountry(nextCountry)
      onCountryChange?.(nextCountry)
    }

    const meta = phoneMeta(formatted, nextCountry)
    onValueChange?.(meta.e164 ?? formatted, meta)
  }

  return (
    <div
      data-slot="phone-input"
      data-size={size}
      data-invalid={ariaInvalid || undefined}
      className={cn(
        "border-input bg-background flex w-full rounded-md border shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/30 focus-within:ring-[3px]",
        "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <CountryPicker
        value={currentCountry}
        countries={countries}
        onValueChange={(nextCountry) => {
          if (isPhoneCountryCode(nextCountry)) updateCountry(nextCountry)
        }}
        showCallingCode
        showCode={false}
        triggerDisplay="calling-code"
        aria-label={countryPickerLabel}
        disabled={disabled || readOnly}
        className="order-first w-auto shrink-0"
        triggerClassName={cn(
          "h-full min-w-[5.25rem] rounded-e-none border-0 border-e px-2.5 shadow-none focus-visible:z-10",
          size === "sm" && "h-8 min-w-[4.75rem] px-2 text-xs sm:h-8",
          size === "default" && "h-9 sm:h-9",
          size === "lg" && "h-10 sm:h-10",
        )}
        contentClassName="w-[min(21rem,calc(100vw-2rem))]"
      />
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={currentValue}
        onChange={(event) => updateValue(event.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={ariaErrorMessage}
        className={cn(
          "rounded-s-none border-0 bg-transparent shadow-none focus-visible:ring-0",
          size === "sm" && "h-8 px-2.5 text-xs md:text-xs",
          size === "default" && "h-9",
          size === "lg" && "h-10 px-4 text-base",
          inputClassName,
        )}
        {...props}
      />
    </div>
  )
})
