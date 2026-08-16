import {
  IconAccessible,
  IconArrowRight,
  IconBraces,
  IconFileTypeSvg,
  IconPhoto,
  IconShieldCheck,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Flag } from "@/components/flags/flag"
import { flagCount, flagNames, type FlagCode } from "@/components/flags/flag-data"
import { FlagGallery } from "@/components/site/flag-gallery"
import { InstallCommand } from "@/components/site/install-command"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroFlags: FlagCode[] = ["ae", "sa", "jp", "br", "za", "ca", "de", "in", "am", "mx", "kr", "gb"]

const benefits = [
  {
    icon: IconBraces,
    title: "Source-owned",
    body: "The shadcn CLI copies typed React into your app. No Flagcn runtime and no vendor lock-in.",
  },
  {
    icon: IconPhoto,
    title: "Every useful shape",
    body: "Render SVG, PNG, or WebP at 4:3, 1:1, or the flag’s original proportions.",
  },
  {
    icon: IconAccessible,
    title: "Accessible defaults",
    body: "Native image props, explicit alt text, decorative mode, and a keyboard-ready picker.",
  },
]

export function HomePage() {
  return (
    <main>
      <section className="hero-grid overflow-hidden border-b">
        <div className="site-container flex min-h-[680px] flex-col items-center justify-center py-20 text-center sm:py-28">
          <Badge variant="outline" className="mb-7 gap-2 bg-background/80 px-3 py-1 shadow-xs backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            The flags registry for shadcn/ui
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">
            Every flag. One shadcn command.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Add production-ready flag components as code you own. Search {flagCount} flags, choose any supported format, and style them with the classes already in your app.
          </p>

          <InstallCommand item="ae" className="mt-9 w-full max-w-3xl text-start" />

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/docs/installation" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Start building <IconArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#flags" className={buttonVariants({ variant: "outline", size: "lg" })}>Browse all flags</a>
          </div>

          <div className="mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-2" aria-label="A sample of available flags">
            {heroFlags.map((code) => (
              <div key={code} className="grid size-12 place-items-center rounded-lg border bg-card/90 shadow-xs backdrop-blur sm:size-14">
                <Flag code={code} width={32} decorative className="max-h-6 max-w-8 shadow-[0_0_0_1px_rgba(0,0,0,.12)]" />
                <span className="sr-only">{flagNames[code]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="site-container grid sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }, index) => (
            <div key={title} className={cn("py-8 sm:p-8", index < benefits.length - 1 && "border-b sm:border-b-0 sm:border-e")}>
              <Icon className="size-5 text-primary" />
              <h2 className="mt-5 font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="flags" className="scroll-mt-18 py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Explore the registry</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Find the exact flag your interface needs.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Switch format and ratio live, then copy the one-line install command. Every item below is available independently.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border text-center">
              <Stat value={flagCount.toString()} label="flags" />
              <Stat value="3" label="formats" />
              <Stat value="MIT" label="code" />
            </div>
          </div>
          <FlagGallery className="mt-10" />
        </div>
      </section>

      <section className="border-t bg-card py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <Badge variant="secondary"><IconShieldCheck /> Clear licensing</Badge>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Built to ship, not just to demo.</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Flagcn source is MIT licensed. Flag artwork is delivered by FlagCDN, whose Flagpedia source marks the images as public domain. Attribution and symbol-use guidance are documented clearly.
            </p>
            <Link to="/docs/license" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Read license details <IconArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid overflow-hidden rounded-lg border bg-border p-px sm:grid-cols-2">
            <Proof icon={IconFileTypeSvg} title="SVG, PNG & WebP" body="A single component API across vector and responsive raster sources." />
            <Proof icon={IconAccessible} title="Native React props" body="Forward className, style, ref, events, fetch priority, and image attributes." />
            <Proof icon={IconBraces} title="One or all" body="Install @flagcn/ae for one wrapper or @flagcn/all for the complete catalog." />
            <Proof icon={IconShieldCheck} title="Rights documented" body="MIT source, third-party notices, attribution, and public-domain artwork notes." />
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-20 bg-card px-4 py-3">
      <p className="font-mono text-sm font-semibold">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}

function Proof({ icon: Icon, title, body }: { icon: typeof IconBraces; title: string; body: string }) {
  return (
    <div className="bg-background p-6">
      <Icon className="size-5 text-primary" />
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  )
}
