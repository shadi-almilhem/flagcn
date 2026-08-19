import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

interface SlidingToggleOption<T extends string> {
  value: T
  label: string
}

interface SlidingToggleGroupProps<T extends string> {
  value: T
  onValueChange: (value: T) => void
  options: readonly SlidingToggleOption<T>[]
  label: string
  className?: string
  itemClassName?: string
}

export function SlidingToggleGroup<T extends string>({
  value,
  onValueChange,
  options,
  label,
  className,
  itemClassName,
}: SlidingToggleGroupProps<T>) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const pillRef = React.useRef<HTMLSpanElement>(null)
  const itemRefs = React.useRef(new Map<T, HTMLButtonElement>())
  const initializedRef = React.useRef(false)

  const moveToValue = React.useCallback((nextValue: T, animate: boolean) => {
    const pill = pillRef.current
    const item = itemRefs.current.get(nextValue)
    if (!pill || !item) return

    if (!animate) pill.style.transition = "none"
    pill.style.transform = `translateX(${item.offsetLeft}px)`
    pill.style.width = `${item.offsetWidth}px`

    if (!animate) {
      void pill.offsetWidth
      pill.style.removeProperty("transition")
    }
  }, [])

  React.useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      moveToValue(value, initializedRef.current)
      initializedRef.current = true
    })
    return () => window.cancelAnimationFrame(frame)
  }, [moveToValue, value])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(() => moveToValue(value, false))
    observer.observe(root)
    return () => observer.disconnect()
  }, [moveToValue, value])

  return (
    <ToggleGroup
      ref={rootRef}
      value={[value]}
      onValueChange={(values) => {
        const next = values[0] as T | undefined
        if (next) onValueChange(next)
      }}
      spacing={0}
      aria-label={label}
      className={cn("t-tabs sharp-tabs", className)}
    >
      <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          ref={(node) => {
            if (node) itemRefs.current.set(option.value, node)
            else itemRefs.current.delete(option.value)
          }}
          value={option.value}
          aria-selected={value === option.value}
          className={cn("t-tab", itemClassName)}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
