// SPDX-License-Identifier: MIT

import { Badge } from "@/components/ui/badge"
import * as React from "react"

import { languageData, type LanguageCode } from "./data/languages"
import { SearchPicker, type SearchPickerProps } from "./search-picker"

export interface LanguagePickerProps extends Omit<SearchPickerProps, "items" | "value" | "defaultValue" | "onValueChange" | "placeholder" | "searchPlaceholder" | "emptyMessage"> {
  value?: LanguageCode
  defaultValue?: LanguageCode
  onValueChange?: (code: LanguageCode) => void
  languages?: readonly LanguageCode[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function LanguagePicker({
  languages,
  placeholder = "Select a language",
  searchPlaceholder = "Search languages…",
  emptyMessage = "No languages found.",
  onValueChange,
  ...props
}: LanguagePickerProps) {
  const items = React.useMemo(() => {
    const allowed = languages ? new Set(languages) : undefined
    return languageData.filter((language) => !allowed || allowed.has(language.code)).map((language) => ({
      value: language.code,
      label: language.name,
      description: language.nativeName,
      searchValue: language.nativeName,
      trailing: language.direction === "rtl" ? <Badge variant="outline" className="font-mono text-[10px]">RTL</Badge> : undefined,
    }))
  }, [languages])

  return <SearchPicker items={items} placeholder={placeholder} searchPlaceholder={searchPlaceholder} emptyMessage={emptyMessage} onValueChange={(code) => onValueChange?.(code as LanguageCode)} {...props} />
}
