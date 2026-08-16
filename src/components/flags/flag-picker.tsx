// SPDX-License-Identifier: MIT

import * as React from "react"

import { cn } from "@/lib/utils"

import { Flag } from "./flag"
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
  disabled?: boolean
  className?: string
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
  disabled = false,
  className,
  name,
  "aria-label": ariaLabel,
}: FlagPickerProps) {
  const [internalValue, setInternalValue] = React.useState<FlagCode | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const listId = React.useId()
  const currentValue = value ?? internalValue

  const filteredFlags = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return flags.filter((flag) => {
      const inKind = !kinds?.length || kinds.includes(flag.kind)
      const matches = !normalizedQuery
        || flag.name.toLocaleLowerCase().includes(normalizedQuery)
        || flag.code.includes(normalizedQuery)
      return inKind && matches
    })
  }, [kinds, query])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  React.useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => searchRef.current?.focus())
  }, [open])

  function selectFlag(code: FlagCode) {
    if (value === undefined) setInternalValue(code)
    onValueChange?.(code)
    setQuery("")
    setOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false)
      requestAnimationFrame(() => triggerRef.current?.focus())
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
    const nextOpen = !open
    if (nextOpen) setActiveIndex(0)
    setOpen(nextOpen)
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
          "border-input bg-background ring-offset-background flex h-9 w-full items-center justify-between rounded-md border px-3 text-sm shadow-xs outline-none transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        onClick={toggleOpen}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
            event.preventDefault()
            setActiveIndex(0)
            setOpen(true)
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
              className="size-5 object-contain ring-1 ring-border"
            />
          ) : null}
          <span className="truncate">{currentValue ? flagNames[currentValue] : placeholder}</span>
        </span>
        <ChevronDownIcon aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
      </button>

      {open ? (
        <div
          className="bg-popover text-popover-foreground absolute z-50 mt-1 w-full min-w-64 overflow-hidden rounded-md border shadow-md"
          onKeyDown={handleKeyDown}
        >
          <div className="border-b p-2">
            <div className="relative">
              <SearchIcon
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
                className="placeholder:text-muted-foreground h-9 w-full rounded-sm bg-transparent ps-8 pe-3 text-sm focus-visible:ring-ring/30 focus-visible:ring-[3px]"
              />
            </div>
          </div>
          <div id={listId} role="listbox" className="max-h-72 overflow-y-auto p-1">
            {filteredFlags.length ? filteredFlags.map((flag, index) => (
              <button
                key={flag.code}
                type="button"
                role="option"
                aria-selected={currentValue === flag.code}
                data-active={index === activeIndex || undefined}
                className="data-[active]:bg-accent data-[active]:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-2 text-start text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/30 focus-visible:ring-[3px]"
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
                  className="h-[15px] w-5 shrink-0 object-contain ring-1 ring-border"
                />
                <span className="min-w-0 flex-1 truncate">{flag.name}</span>
                <span className="text-muted-foreground font-mono text-[11px] uppercase">{flag.code}</span>
                <CheckIcon
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

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}
