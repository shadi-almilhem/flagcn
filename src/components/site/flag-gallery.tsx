import { IconCheck, IconCopy, IconDownload, IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { Flag } from "@/components/flags/flag"
import { getCountry, normalizeCountrySearch } from "@/components/flags/country-utils"
import {
  flags,
  type FlagCode,
  type FlagKind,
} from "@/components/flags/flag-data"
import {
  flagFormats,
  flagRatios,
  getFlagAssetInfo,
  getFlagUrl,
  type FlagFormat,
  type FlagRatio,
} from "@/components/flags/flag-utils"
import { CopyButton } from "@/components/site/copy-button"
import { SlidingToggleGroup } from "@/components/site/sliding-toggle-group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getInstallCommand } from "@/config/site"
import { copyImageToClipboard } from "@/lib/copy-image"
import { downloadRemoteFile } from "@/lib/download-file"
import { cn } from "@/lib/utils"

type KindFilter = FlagKind | "all"

interface FlagGalleryProps {
  className?: string
  featuredCodes?: readonly FlagCode[]
}

const ratioLabels: Record<FlagRatio, string> = {
  "4x3": "4:3",
  "1x1": "1:1",
  original: "Source",
}

const formatLabels: Record<FlagFormat, string> = {
  svg: "SVG",
  png: "PNG",
  webp: "WebP",
  jpg: "JPEG",
}

const formatOptions = flagFormats.map((value) => ({ value, label: formatLabels[value] }))
const ratioOptions = flagRatios.map((value) => ({ value, label: ratioLabels[value] }))
const kindOptions: { value: KindFilter; label: string }[] = [
  { value: "all", label: "All flag types" },
  { value: "country", label: "Countries" },
  { value: "subdivision", label: "Subdivisions" },
  { value: "organization", label: "Organizations" },
]
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
    const country = getCountry(flag.code)
    const searchValue = country
      ? [flag.name, flag.code, country.alpha3, country.nativeName, country.capital, ...country.aliases, ...country.callingCodes, ...country.currencies, ...country.languages].join(" ")
      : `${flag.name} ${flag.code}`
    const matchesQuery = !deferredQuery || normalizeCountrySearch(searchValue).includes(normalizeCountrySearch(deferredQuery))
    return matchesQuery && (kind === "all" || flag.kind === kind)
  }), [deferredQuery, kind, sourceFlags])

  return (
    <div className={className}>
      <div className="border bg-card">
        <div className="grid gap-px bg-border lg:grid-cols-[minmax(250px,1fr)_12rem_12rem_12rem]">
          <div className="relative flex min-w-0 items-center bg-background">
            <IconSearch aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, ISO, calling code, currency…"
              aria-label="Search flags"
              className="h-full min-h-14 border-0 bg-transparent ps-9 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="flex min-w-0 items-center justify-between gap-3 bg-background px-3 py-2 lg:grid lg:grid-cols-1 lg:justify-items-center lg:gap-1">
            <span className="text-xs text-muted-foreground lg:text-center">Format</span>
            <SlidingToggleGroup
              value={format}
              onValueChange={setFormat}
              options={formatOptions}
              label="Image format"
              className="w-44 lg:w-full"
              itemClassName="min-w-0 flex-1 px-0"
            />
          </div>

          <div className="flex min-w-0 items-center justify-between gap-3 bg-background px-3 py-2 lg:grid lg:grid-cols-1 lg:justify-items-center lg:gap-1">
            <span className="text-xs text-muted-foreground lg:text-center">Proportions</span>
            <SlidingToggleGroup
              value={ratio}
              onValueChange={setRatio}
              options={ratioOptions}
              label="Flag proportions"
              className="w-44 lg:w-full"
              itemClassName="min-w-0 flex-1 px-0"
            />
          </div>

          <div className="flex items-center justify-center bg-background px-3 py-2 lg:grid lg:grid-cols-1 lg:justify-items-center lg:gap-1">
            <span className="hidden text-center text-xs text-muted-foreground lg:block">Flag type</span>
            <Select
              items={kindOptions}
              value={kind}
              onValueChange={(value) => setKind(value as KindFilter)}
            >
              <SelectTrigger aria-label="Filter by flag type" className="h-9 w-44 border-0 bg-transparent shadow-none lg:w-full">
                <SelectValue className="justify-center ps-4 text-center" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} align="end">
                <SelectGroup>
                  {kindOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-x border-b bg-muted/20 px-3 py-2.5">
        <p className="text-xs text-muted-foreground">
          Showing <strong className="font-medium text-foreground">{filteredFlags.length}</strong>{featuredCodes ? ` featured of ${flags.length}` : " registry items"}
          {ratio === "original" && format === "svg" ? <span className="hidden sm:inline"> · Source proportions remain vector SVG.</span> : null}
        </p>
        <Badge variant="outline" className="font-mono text-[10px] uppercase">
          {formatLabels[format]} · {ratioLabels[ratio]}
        </Badge>
      </div>

      {filteredFlags.length ? (
        <div className="flag-gallery-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFlags.map((flag) => {
            const assetUrl = getFlagUrl(flag.code, { format, ratio, width: 160 })
            const assetInfo = getFlagAssetInfo(flag.code, { format, ratio, width: 160 })
            const country = getCountry(flag.code)
            return (
              <Card
                key={flag.code}
                className={cn("flag-gallery-card gap-0 rounded-none border-0 py-0 shadow-none", !featuredCodes && "flag-tile")}
              >
                <CardContent className="flag-stage relative grid h-44 place-items-center border-b bg-muted/10 p-7">
                  <Tooltip>
                    <TooltipTrigger render={
                      <CopyButton
                        value={getInstallCommand(flag.code)}
                        label="Install command copied"
                        hideLabel
                        size="icon"
                        aria-label={`Copy install command for ${flag.name}`}
                        className="absolute end-2 top-2 size-9"
                      />
                    } />
                    <TooltipContent>Copy install command</TooltipContent>
                  </Tooltip>
                  <div
                    data-slot="flag-frame"
                    className={cn(
                      "grid h-24 w-32 max-w-full place-items-center bg-muted outline outline-1 -outline-offset-1 outline-border",
                      ratio === "1x1" && "size-24",
                    )}
                  >
                    <Flag
                      code={flag.code}
                      format={format}
                      ratio={ratio}
                      width={144}
                      alt={`${flag.name} flag`}
                      loading={featuredCodes ? "eager" : undefined}
                      className="size-full object-contain"
                    />
                  </div>
                </CardContent>

                <CardHeader className="min-w-0 gap-1 p-3.5 pb-3">
                  <CardTitle className="truncate text-sm font-medium">{flag.name}</CardTitle>
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <CardDescription className="truncate font-mono text-[10px] uppercase tracking-wider">
                        {flag.code}{country?.alpha3 ? ` / ${country.alpha3}` : ""}{country?.callingCodes[0] ? ` · ${country.callingCodes[0]}` : ""} · {flag.kind}
                    </CardDescription>
                    <span className="shrink-0 text-[10px] text-muted-foreground" title={assetInfo.label}>{assetInfo.provider}</span>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-start gap-1 border-t bg-muted/15 p-2">
                  <Tooltip>
                    <TooltipTrigger render={
                      <CopyButton
                        value={`<Flag code="${flag.code}" format="${format}" ratio="${ratio}" alt="${flag.name} flag" />`}
                        label="Code"
                        aria-label={`Copy JSX for ${flag.name}`}
                        className="h-9 px-2.5"
                        labelClassName="min-w-0"
                      />
                    } />
                    <TooltipContent>Copy component code</TooltipContent>
                  </Tooltip>
                  <ImageCopyButton
                    sourceUrl={assetUrl}
                    ratio={ratio}
                    format={format}
                    formatLabel={formatLabels[format]}
                    flagName={flag.name}
                  />
                  <DownloadButton
                    sourceUrl={assetUrl}
                    fileName={`${flag.code}-${ratio}.${format}`}
                    formatLabel={formatLabels[format]}
                    flagName={flag.name}
                  />
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Empty className="min-h-80 border border-t-0">
          <EmptyHeader>
            <EmptyMedia variant="icon"><IconSearch /></EmptyMedia>
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

function DownloadButton({ sourceUrl, fileName, formatLabel, flagName }: { sourceUrl: string; fileName: string; formatLabel: string; flagName: string }) {
  const [status, setStatus] = React.useState<"idle" | "downloading" | "error">("idle")

  async function download() {
    try {
      setStatus("downloading")
      await downloadRemoteFile(sourceUrl, fileName)
      setStatus("idle")
    } catch {
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 2200)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger render={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={download}
          disabled={status === "downloading"}
          aria-label={`Download ${flagName} ${formatLabel} flag`}
          className="ms-auto size-9"
        >
          <IconDownload aria-hidden="true" />
          <span className="sr-only" aria-live="polite">{status === "error" ? "Download failed" : status === "downloading" ? "Downloading" : ""}</span>
        </Button>
      } />
      <TooltipContent>{status === "error" ? "Download failed" : `Download ${formatLabel}`}</TooltipContent>
    </Tooltip>
  )
}

function ImageCopyButton({
  sourceUrl,
  ratio,
  format,
  formatLabel,
  flagName,
}: {
  sourceUrl: string
  ratio: FlagRatio
  format: FlagFormat
  formatLabel: string
  flagName: string
}) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle")

  async function copyImage() {
    try {
      await copyImageToClipboard(sourceUrl, { ratio, format })
      setStatus("copied")
      window.setTimeout(() => setStatus("idle"), 1600)
    } catch {
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 2200)
    }
  }

  const label = status === "copied" ? "Copied" : status === "error" ? "Copy failed" : `Copy ${formatLabel} image`

  return (
    <Tooltip>
      <TooltipTrigger render={
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={copyImage}
          aria-label={`Copy ${flagName} ${formatLabel} image`}
          className="h-9 px-2.5"
        >
          <span className="t-icon-swap" data-state={status === "copied" ? "b" : "a"} data-icon="inline-start" aria-hidden="true">
            <span className="t-icon" data-icon="a"><IconCopy /></span>
            <span className="t-icon" data-icon="b"><IconCheck /></span>
          </span>
          <span>{formatLabel}</span>
          <span className="sr-only" aria-live="polite">{status === "copied" ? `${flagName} image copied` : status === "error" ? "Copy failed" : ""}</span>
        </Button>
      } />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
