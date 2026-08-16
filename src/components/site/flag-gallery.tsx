import { IconExternalLink, IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { Flag } from "@/components/flags/flag"
import { flags, type FlagKind } from "@/components/flags/flag-data"
import { flagFormats, flagRatios, getFlagUrl, type FlagFormat, type FlagRatio } from "@/components/flags/flag-utils"
import { CopyButton } from "@/components/site/copy-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getInstallCommand } from "@/config/site"
import { cn } from "@/lib/utils"

type KindFilter = FlagKind | "all"

interface FlagGalleryProps {
  className?: string
}

const ratioLabels: Record<FlagRatio, string> = {
  "4x3": "4:3",
  "1x1": "1:1",
  original: "Original",
}

export function FlagGallery({ className }: FlagGalleryProps) {
  const [query, setQuery] = React.useState("")
  const [format, setFormat] = React.useState<FlagFormat>("svg")
  const [ratio, setRatio] = React.useState<FlagRatio>("4x3")
  const [kind, setKind] = React.useState<KindFilter>("all")
  const deferredQuery = React.useDeferredValue(query.trim().toLocaleLowerCase())

  const filteredFlags = React.useMemo(() => flags.filter((flag) => {
    const matchesQuery = !deferredQuery
      || flag.name.toLocaleLowerCase().includes(deferredQuery)
      || flag.code.includes(deferredQuery)
    return matchesQuery && (kind === "all" || flag.kind === kind)
  }), [deferredQuery, kind])

  function updateFormat(values: unknown[]) {
    const next = values[0] as FlagFormat | undefined
    if (next) setFormat(next)
  }

  function updateRatio(values: unknown[]) {
    const next = values[0] as FlagRatio | undefined
    if (next) setRatio(next)
  }

  return (
    <div className={className}>
      <div className="sticky top-14 z-30 border-y bg-background/94 py-3 backdrop-blur-xl sm:rounded-lg sm:border sm:px-3">
        <div className="grid gap-3 xl:grid-cols-[minmax(250px,1fr)_auto_auto_auto] xl:items-center">
          <div className="relative min-w-0">
            <IconSearch aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by country, territory, or code…"
              aria-label="Search flags"
              className="bg-background ps-9"
            />
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Format</span>
            <ToggleGroup value={[format]} onValueChange={updateFormat} aria-label="Image format" className="rounded-md bg-muted p-1">
              {flagFormats.map((option) => (
                <ToggleGroupItem key={option} value={option} className="rounded-sm px-2.5 font-mono text-[10px] uppercase">
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Ratio</span>
            <ToggleGroup value={[ratio]} onValueChange={updateRatio} aria-label="Image ratio" className="rounded-md bg-muted p-1">
              {flagRatios.map((option) => (
                <ToggleGroupItem key={option} value={option} className="rounded-sm px-2.5 font-mono text-[10px]">
                  {ratioLabels[option]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <NativeSelect
            value={kind}
            onChange={(event) => setKind(event.target.value as KindFilter)}
            aria-label="Filter by flag type"
            className="w-full bg-background sm:w-42"
          >
            <option value="all">All flag types</option>
            <option value="country">Countries</option>
            <option value="subdivision">Subdivisions</option>
            <option value="organization">Organizations</option>
          </NativeSelect>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing <strong className="font-medium text-foreground">{filteredFlags.length}</strong> registry items
        </p>
        <Badge variant="outline" className="font-mono text-[10px] uppercase">{format} · {ratioLabels[ratio]}</Badge>
      </div>

      {filteredFlags.length ? (
        <div className="mt-4 grid overflow-hidden rounded-lg border bg-border p-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFlags.map((flag) => {
            const assetUrl = getFlagUrl(flag.code, { format, ratio, width: 160 })
            return (
              <article key={flag.code} className="flag-tile group relative min-h-64 bg-card">
                <div className="flag-card-actions absolute end-3 top-3 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <CopyButton
                    value={getInstallCommand(flag.code)}
                    label="Install"
                    aria-label={`Copy install command for ${flag.name}`}
                    className="border bg-background/95 shadow-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={`Open ${flag.name} ${format.toUpperCase()} asset`}
                    title={`Open ${format.toUpperCase()} asset`}
                    onClick={() => window.open(assetUrl, "_blank", "noopener,noreferrer")}
                    className="bg-background/95"
                  >
                    <IconExternalLink />
                  </Button>
                </div>
                <div className="flag-stage grid h-48 place-items-center border-b p-8">
                  <Flag
                    code={flag.code}
                    format={format}
                    ratio={ratio}
                    width={144}
                    alt={`${flag.name} flag`}
                    className={cn(
                      "max-h-28 max-w-36 shadow-[0_10px_28px_-16px_rgba(0,0,0,.7),0_0_0_1px_rgba(0,0,0,.13)] transition-transform duration-200 group-hover:scale-[1.025]",
                      ratio === "1x1" && "max-w-28",
                    )}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{flag.name}</h3>
                    <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{flag.code} · {flag.kind}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">@flagcn/{flag.code}</span>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="mt-4 grid min-h-80 place-items-center rounded-lg border border-dashed text-center">
          <div>
            <p className="font-medium">No matching flags</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another name, code, or flag type.</p>
            <Button variant="outline" className="mt-5" onClick={() => { setQuery(""); setKind("all") }}>Clear filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}
