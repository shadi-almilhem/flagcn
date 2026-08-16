import { IconExternalLink, IconFlagOff, IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { Flag } from "@/components/flags/flag"
import {
  flags,
  type FlagCode,
  type FlagKind,
} from "@/components/flags/flag-data"
import {
  flagFormats,
  flagRatios,
  getFlagUrl,
  type FlagFormat,
  type FlagRatio,
} from "@/components/flags/flag-utils"
import { CopyButton } from "@/components/site/copy-button"
import { SlidingToggleGroup } from "@/components/site/sliding-toggle-group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { getInstallCommand } from "@/config/site"
import { cn } from "@/lib/utils"

type KindFilter = FlagKind | "all"

interface FlagGalleryProps {
  className?: string
  featuredCodes?: readonly FlagCode[]
}

const ratioLabels: Record<FlagRatio, string> = {
  "4x3": "4:3",
  "1x1": "1:1",
  original: "Original",
}

const formatLabels: Record<FlagFormat, string> = {
  svg: "SVG",
  png: "PNG",
  webp: "WebP",
  jpg: "JPEG",
}

const formatOptions = flagFormats.map((value) => ({ value, label: formatLabels[value] }))
const ratioOptions = flagRatios.map((value) => ({ value, label: ratioLabels[value] }))
const flagsByCode = new Map(flags.map((flag) => [flag.code, flag]))

export function FlagGallery({ className, featuredCodes }: FlagGalleryProps) {
  const [query, setQuery] = React.useState("")
  const [format, setFormat] = React.useState<FlagFormat>("svg")
  const [ratio, setRatio] = React.useState<FlagRatio>("4x3")
  const [kind, setKind] = React.useState<KindFilter>("all")
  const deferredQuery = React.useDeferredValue(query.trim().toLocaleLowerCase())

  const sourceFlags = React.useMemo(() => {
    if (!featuredCodes) return flags
    return featuredCodes.flatMap((code) => {
      const flag = flagsByCode.get(code)
      return flag ? [flag] : []
    })
  }, [featuredCodes])

  const filteredFlags = React.useMemo(() => sourceFlags.filter((flag) => {
    const matchesQuery = !deferredQuery
      || flag.name.toLocaleLowerCase().includes(deferredQuery)
      || flag.code.includes(deferredQuery)
    return matchesQuery && (kind === "all" || flag.kind === kind)
  }), [deferredQuery, kind, sourceFlags])

  return (
    <div className={className}>
      <div className="border bg-card">
        <div className="grid gap-px bg-border lg:grid-cols-[minmax(250px,1fr)_auto_auto_auto]">
          <div className="relative min-w-0 bg-background">
            <IconSearch aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search flags or ISO codes…"
              aria-label="Search flags"
              className="h-11 border-0 bg-transparent ps-9 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="flex min-w-0 items-center justify-between gap-3 bg-background px-3 py-2 lg:justify-start">
            <span className="text-xs text-muted-foreground">Format</span>
            <SlidingToggleGroup
              value={format}
              onValueChange={setFormat}
              options={formatOptions}
              label="Image format"
            />
          </div>

          <div className="flex min-w-0 items-center justify-between gap-3 bg-background px-3 py-2 lg:justify-start">
            <span className="text-xs text-muted-foreground">Frame</span>
            <SlidingToggleGroup
              value={ratio}
              onValueChange={setRatio}
              options={ratioOptions}
              label="Image frame ratio"
            />
          </div>

          <div className="bg-background p-1">
            <NativeSelect
              value={kind}
              onChange={(event) => setKind(event.target.value as KindFilter)}
              aria-label="Filter by flag type"
              className="h-9 w-full border-0 bg-transparent shadow-none lg:w-42"
            >
              <option value="all">All flag types</option>
              <option value="country">Countries</option>
              <option value="subdivision">Subdivisions</option>
              <option value="organization">Organizations</option>
            </NativeSelect>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-x border-b bg-muted/20 px-3 py-2.5">
        <p className="text-xs text-muted-foreground">
          Showing <strong className="font-medium text-foreground">{filteredFlags.length}</strong>{featuredCodes ? ` featured of ${flags.length}` : " registry items"}
        </p>
        <Badge variant="outline" className="font-mono text-[10px] uppercase">
          {formatLabels[format]} · {ratioLabels[ratio]}
        </Badge>
      </div>

      {filteredFlags.length ? (
        <div className="grid border-s sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFlags.map((flag) => {
            const assetUrl = getFlagUrl(flag.code, { format, ratio, width: 160 })
            return (
              <article
                key={flag.code}
                className={cn("group border-e border-b bg-card", !featuredCodes && "flag-tile")}
              >
                <div className="flag-stage grid h-44 place-items-center border-b bg-muted/10 p-7">
                  <Flag
                    code={flag.code}
                    format={format}
                    ratio={ratio}
                    width={144}
                    alt={`${flag.name} flag`}
                    loading={featuredCodes ? "eager" : undefined}
                    className={cn(
                      "h-24 w-32 max-w-full object-contain ring-1 ring-border transition-transform duration-200 group-hover:scale-[1.02]",
                      ratio === "1x1" && "size-24",
                      ratio === "original" && "h-24 w-32",
                    )}
                  />
                </div>

                <div className="flex min-h-22 items-center gap-3 p-3.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium">{flag.name}</h3>
                    <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {flag.code} · {flag.kind}
                    </p>
                  </div>
                  <CopyButton
                    value={getInstallCommand(flag.code)}
                    label="Install"
                    aria-label={`Copy install command for ${flag.name}`}
                    className="h-8 shrink-0 border px-2.5"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Open ${flag.name} ${formatLabels[format]} source asset`}
                    title={`Open ${formatLabels[format]} source asset`}
                    onClick={() => window.open(assetUrl, "_blank", "noopener,noreferrer")}
                    className="size-8 shrink-0"
                  >
                    <IconExternalLink />
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <Empty className="min-h-80 border border-t-0">
          <EmptyHeader>
            <EmptyMedia variant="icon"><IconFlagOff /></EmptyMedia>
            <EmptyTitle>No matching flags</EmptyTitle>
            <EmptyDescription>Try another country name, ISO code, or flag type.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => { setQuery(""); setKind("all") }}>Clear filters</Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
