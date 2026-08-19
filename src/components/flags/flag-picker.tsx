// SPDX-License-Identifier: MIT

import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { cn } from "@/lib/utils"

import { Flag } from "./flag"
import { getCountry, normalizeCountrySearch } from "./country-utils"
import { flagNames, flags, type FlagCode, type FlagKind } from "./flag-data"
import type { FlagFormat, FlagRatio } from "./flag-utils"

export interface FlagPickerProps {
  value?: FlagCode
  defaultValue?: FlagCode
  onValueChange?: (code: FlagCode) => void
  format?: FlagFormat
  ratio?: FlagRatio
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  kinds?: FlagKind[]
  codes?: readonly FlagCode[]
  disabledCodes?: readonly FlagCode[]
  showCode?: boolean
  showCallingCode?: boolean
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
  triggerDisplay?: "name" | "code" | "calling-code" | "flag"
  name?: string
  "aria-label"?: string
}

export function FlagPicker({
  value,
  defaultValue,
  onValueChange,
  format = "svg",
  ratio = "4x3",
  placeholder = "Select a flag",
  searchPlaceholder = "Search by name or code…",
  emptyMessage = "No flags found.",
  kinds,
  codes,
  disabledCodes = [],
  showCode = true,
  showCallingCode = false,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  triggerDisplay = "name",
  name,
  "aria-label": ariaLabel,
}: FlagPickerProps) {
  const [internalValue, setInternalValue] = React.useState<FlagCode | undefined>(defaultValue)
  const [phase, setPhase] = React.useState<"closed" | "open" | "closing">("closed")
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const closeTimerRef = React.useRef<number | undefined>(undefined)
  const listId = React.useId()
  const currentValue = value ?? internalValue
  const currentCountry = currentValue ? getCountry(currentValue) : undefined
  const open = phase === "open"
  const allowedCodes = React.useMemo(() => codes ? new Set(codes) : undefined, [codes])
  const disabledCodeSet = React.useMemo(() => new Set(disabledCodes), [disabledCodes])

  const filteredFlags = React.useMemo(() => {
    const normalizedQuery = normalizeCountrySearch(query)
    return flags.filter((flag) => {
      const inKind = !kinds?.length || kinds.includes(flag.kind)
      const country = getCountry(flag.code)
      const searchValue = country
        ? [flag.name, flag.code, country.alpha2, country.alpha3, country.nativeName, ...country.aliases, ...country.callingCodes].join(" ")
        : `${flag.name} ${flag.code}`
      return inKind && (!allowedCodes || allowedCodes.has(flag.code)) && (!normalizedQuery || normalizeCountrySearch(searchValue).includes(normalizedQuery))
    })
  }, [allowedCodes, kinds, query])

  const closePicker = React.useCallback((restoreFocus = false) => {
    window.clearTimeout(closeTimerRef.current)
    setPhase((current) => current === "closed" ? current : "closing")
    closeTimerRef.current = window.setTimeout(() => {
      setPhase("closed")
      if (restoreFocus) triggerRef.current?.focus()
    }, 150)
  }, [])

  React.useEffect(() => () => window.clearTimeout(closeTimerRef.current), [])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closePicker()
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [closePicker, open])

  React.useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => searchRef.current?.focus())
  }, [open])

  function selectFlag(code: FlagCode) {
    if (disabledCodeSet.has(code)) return
    if (value === undefined) setInternalValue(code)
    onValueChange?.(code)
    setQuery("")
    closePicker(true)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      closePicker(true)
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, filteredFlags.length - 1))
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    }
    if (event.key === "Enter" && filteredFlags[activeIndex]) {
      event.preventDefault()
      selectFlag(filteredFlags[activeIndex].code)
    }
  }

  function toggleOpen() {
    if (open) closePicker()
    else {
      window.clearTimeout(closeTimerRef.current)
      setActiveIndex(0)
      setPhase("open")
    }
  }

  return (
    <div ref={rootRef} data-slot="flag-picker" className={cn("relative w-full", className)}>
      {name ? <input type="hidden" name={name} value={currentValue ?? ""} /> : null}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={ariaLabel ?? (currentValue ? `${placeholder}: ${flagNames[currentValue]}` : placeholder)}
        disabled={disabled}
        className={cn(
          "border-input bg-background ring-offset-background flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] sm:h-9",
          "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          triggerClassName,
        )}
        onClick={toggleOpen}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
            event.preventDefault()
            setActiveIndex(0)
            window.clearTimeout(closeTimerRef.current)
            setPhase("open")
          }
        }}
      >
        <span className={cn("flex min-w-0 items-center gap-2", !currentValue && "text-muted-foreground")}>
          {currentValue ? (
            <Flag
              code={currentValue}
              format={format}
              width={24}
              ratio={ratio}
              alt=""
              decorative
              className="size-5 object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/15"
            />
          ) : null}
          {triggerDisplay !== "flag" ? (
            <span className="truncate">
              {currentValue
                ? triggerDisplay === "code"
                  ? currentValue.toUpperCase()
                  : triggerDisplay === "calling-code"
                    ? currentCountry?.callingCodes[0] ?? currentValue.toUpperCase()
                    : flagNames[currentValue]
                : placeholder}
            </span>
          ) : null}
        </span>
        <IconChevronDown aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
      </button>

      {phase !== "closed" ? (
        <div
          data-origin="top"
          className={cn(
            "t-dropdown bg-popover text-popover-foreground absolute z-50 mt-1 w-full min-w-64 overflow-hidden rounded-md border shadow-md",
            phase === "open" ? "is-open" : "is-closing",
            contentClassName,
          )}
          onKeyDown={handleKeyDown}
        >
          <div className="border-b p-2">
            <div className="relative">
              <IconSearch
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2"
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={filteredFlags[activeIndex] ? `${listId}-${filteredFlags[activeIndex].code}` : undefined}
                className="placeholder:text-muted-foreground h-9 w-full rounded-sm bg-transparent ps-8 pe-3 text-sm focus-visible:ring-ring/30 focus-visible:ring-[3px]"
              />
            </div>
          </div>
          <div id={listId} role="listbox" className="max-h-72 overflow-y-auto p-1">
            {filteredFlags.length ? filteredFlags.map((flag, index) => (
              <button
                key={flag.code}
                id={`${listId}-${flag.code}`}
                type="button"
                role="option"
                aria-selected={currentValue === flag.code}
                disabled={disabledCodeSet.has(flag.code)}
                data-active={index === activeIndex || undefined}
                className="data-[active]:bg-accent data-[active]:text-accent-foreground flex min-h-10 w-full items-center gap-2 rounded-sm px-2 py-2 text-start text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/30 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-40 sm:min-h-9"
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => selectFlag(flag.code)}
              >
                <Flag
                  code={flag.code}
                  format={format}
                  width={24}
                  ratio={ratio}
                  alt=""
                  decorative
                  className="h-[15px] w-5 shrink-0 object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/15"
                />
                <span className="min-w-0 flex-1 truncate">{flag.name}</span>
                {showCallingCode && getCountry(flag.code)?.callingCodes[0] ? (
                  <span className="text-muted-foreground font-mono text-[11px]">{getCountry(flag.code)?.callingCodes[0]}</span>
                ) : showCode ? (
                  <span className="text-muted-foreground font-mono text-[11px] uppercase">{flag.code}</span>
                ) : null}
                <IconCheck
                  aria-hidden="true"
                  className={cn("size-4", currentValue === flag.code ? "opacity-100" : "opacity-0")}
                />
              </button>
            )) : (
              <p className="text-muted-foreground px-3 py-8 text-center text-sm">{emptyMessage}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
