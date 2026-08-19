// SPDX-License-Identifier: MIT

import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface SearchPickerItem {
  value: string
  label: string
  description?: string
  searchValue?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  disabled?: boolean
}

export interface SearchPickerProps {
  items: readonly SearchPickerItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder: string
  searchPlaceholder: string
  emptyMessage: string
  disabled?: boolean
  name?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  "aria-label"?: string
}

export function SearchPicker({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  disabled,
  name,
  className,
  triggerClassName,
  contentClassName,
  "aria-label": ariaLabel,
}: SearchPickerProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [query, setQuery] = React.useState("")
  const [phase, setPhase] = React.useState<"closed" | "open" | "closing">("closed")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const closeTimerRef = React.useRef<number | undefined>(undefined)
  const listId = React.useId()
  const currentValue = value ?? internalValue
  const selectedItem = items.find((item) => item.value === currentValue)
  const open = phase === "open"

  const filteredItems = React.useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    if (!normalized) return items
    return items.filter((item) => `${item.label} ${item.description ?? ""} ${item.value} ${item.searchValue ?? ""}`.toLocaleLowerCase().includes(normalized))
  }, [items, query])

  const close = React.useCallback((restoreFocus = false) => {
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
      if (!rootRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [close, open])

  React.useEffect(() => {
    if (open) requestAnimationFrame(() => searchRef.current?.focus())
  }, [open])

  function selectItem(item: SearchPickerItem) {
    if (item.disabled) return
    if (value === undefined) setInternalValue(item.value)
    onValueChange?.(item.value)
    setQuery("")
    close(true)
  }

  return (
    <div ref={rootRef} data-slot="search-picker" className={cn("relative min-w-0 w-full", className)}>
      {name ? <input type="hidden" name={name} value={currentValue ?? ""} /> : null}
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={ariaLabel ?? placeholder}
        disabled={disabled}
        className={cn("h-10 min-w-0 w-full justify-between px-3 font-normal sm:h-9", triggerClassName)}
        onClick={() => {
          if (open) close()
          else {
            window.clearTimeout(closeTimerRef.current)
            setActiveIndex(0)
            setPhase("open")
          }
        }}
      >
        <span className={cn("flex min-w-0 items-center gap-2", !selectedItem && "text-muted-foreground")}>
          {selectedItem?.leading}
          <span className="truncate">{selectedItem?.label ?? placeholder}</span>
        </span>
        <IconChevronDown data-icon="inline-end" aria-hidden="true" />
      </Button>

      {phase !== "closed" ? (
        <div
          data-origin="top"
          className={cn("t-dropdown absolute z-50 mt-1 w-full min-w-64 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md", phase === "open" ? "is-open" : "is-closing", contentClassName)}
          onKeyDown={(event) => {
            if (event.key === "Escape") close(true)
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setActiveIndex((index) => Math.min(index + 1, filteredItems.length - 1))
            }
            if (event.key === "ArrowUp") {
              event.preventDefault()
              setActiveIndex((index) => Math.max(index - 1, 0))
            }
            if (event.key === "Enter" && filteredItems[activeIndex]) {
              event.preventDefault()
              selectItem(filteredItems[activeIndex])
            }
          }}
        >
          <div className="relative border-b p-2">
            <IconSearch aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              aria-controls={listId}
              aria-activedescendant={filteredItems[activeIndex] ? `${listId}-${filteredItems[activeIndex].value}` : undefined}
              className="h-9 ps-8 shadow-none"
            />
          </div>
          <div id={listId} role="listbox" className="max-h-72 overflow-y-auto p-1">
            {filteredItems.length ? filteredItems.map((item, index) => (
              <button
                key={item.value}
                id={`${listId}-${item.value}`}
                type="button"
                role="option"
                aria-selected={item.value === currentValue}
                disabled={item.disabled}
                data-active={index === activeIndex || undefined}
                className="flex min-h-10 w-full items-center gap-2 rounded-sm px-2 py-2 text-start text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent data-[active]:text-accent-foreground focus-visible:ring-ring/30 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-40 sm:min-h-9"
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => selectItem(item)}
              >
                {item.leading}
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{item.label}</span>
                  {item.description ? <span className="block truncate text-xs text-muted-foreground">{item.description}</span> : null}
                </span>
                {item.trailing}
                <IconCheck aria-hidden="true" className={cn("size-4", item.value === currentValue ? "opacity-100" : "opacity-0")} />
              </button>
            )) : <p className="px-3 py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>}
          </div>
        </div>
      ) : null}
    </div>
  )
}
