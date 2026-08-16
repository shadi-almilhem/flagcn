import {
  IconAccessible,
  IconArrowRight,
  IconBraces,
  IconFileTypeSvg,
  IconPhoto,
  IconShieldCheck,
} from "@tabler/icons-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { Flag } from "@/components/flags/flag"
import { flagCount, flagNames, type FlagCode } from "@/components/flags/flag-data"
import { FlagGallery } from "@/components/site/flag-gallery"
import { InstallCommand } from "@/components/site/install-command"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroFlags: FlagCode[] = ["ae", "sa", "jp", "br", "za", "ca", "de", "in", "am", "mx", "kr", "gb"]
const featuredFlags: FlagCode[] = ["ae", "sa", "jp", "br", "za", "ca", "de", "in", "us-ca", "gb-eng", "eu", "un"]

const benefits = [
  {
    icon: IconBraces,
    title: "Source you own",
    body: "The shadcn CLI copies typed React into your app. No Flagcn runtime, hidden CSS, or vendor lock-in.",
  },
  {
    icon: IconPhoto,
    title: "No clipped artwork",
    body: "Use 4:3, square, or original frames while preserving the complete flag across SVG, PNG, WebP, and JPEG.",
  },
  {
    icon: IconAccessible,
    title: "Accessible by default",
    body: "Meaningful alt text, an explicit decorative mode, native image props, and a keyboard-ready picker.",
  },
]

export function HomePage() {
  const [heroShown, setHeroShown] = React.useState(false)

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHeroShown(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <main>
      <section className="overflow-hidden border-b">
        <div className="site-container flex min-h-[720px] flex-col items-center justify-center py-20 text-center sm:py-28">
          <div className={cn("t-stagger", heroShown && "is-shown")}>
            <h1 className="t-stagger-line t-stagger-line--1 max-w-5xl text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-7xl sm:leading-[1.03] lg:text-[84px]">
              Every flag your shadcn app needs.
            </h1>
            <p className="t-stagger-line t-stagger-line--2 mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Add one accessible React flag or the complete {flagCount}-component catalog. Pick SVG, PNG, WebP, or JPEG, switch between 4:3 and 1:1, then style the source as your own.
            </p>
          </div>

          <InstallCommand item="ae" className="mt-9 w-full max-w-2xl" />

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/docs/installation" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Read the docs
              <IconArrowRight data-icon="inline-end" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/flags" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Browse {flagCount} flags
            </Link>
          </div>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-6 border-s border-t sm:grid-cols-12" aria-label="A sample of available flags">
            {heroFlags.map((code) => (
              <div key={code} className="aspect-[4/3] overflow-hidden border-e border-b bg-card/70">
                <Flag code={code} format="svg" ratio="4x3" width={160} decorative className="size-full object-cover" />
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
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Live component examples</p>
              <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Preview the source before you copy it.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Switch delivery format and frame without reloading. Every preview uses the same Flag component installed into your project.
              </p>
            </div>
            <div className="grid grid-cols-3 border-s border-t text-center">
              <Stat value={flagCount.toString()} label="components" />
              <Stat value="4" label="formats" />
              <Stat value="MIT" label="source" />
            </div>
          </div>

          <FlagGallery featuredCodes={featuredFlags} className="mt-10" />

          <div className="mt-6 flex justify-center">
            <Link to="/flags" className={buttonVariants({ variant: "outline" })}>
              Explore the complete catalog
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-card py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div>
            <Badge variant="secondary"><IconShieldCheck /> Rights documented</Badge>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Built for production, from the component API to the license.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Flagcn source is MIT licensed. SVG artwork comes from Flag Icons under MIT. Raster artwork is delivered by FlagCDN, whose Flagpedia documentation marks the images as public domain. Attribution and official-symbol guidance stay visible and explicit.
            </p>
            <Link to="/docs/license" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Read the license notes <IconArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid border-s border-t sm:grid-cols-2">
            <Proof icon={IconFileTypeSvg} title="Four delivery formats" body="SVG, PNG, WebP, and JPEG behind one typed component API." />
            <Proof icon={IconAccessible} title="Native React props" body="Forward className, style, refs, events, fetch priority, and image attributes." />
            <Proof icon={IconBraces} title="Install one or all" body="Add @flagcn/ae for one wrapper or @flagcn/all for the complete catalog." />
            <Proof icon={IconShieldCheck} title="Rights are explicit" body="MIT source, third-party notices, attribution, and public-domain artwork notes." />
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-22 border-e border-b bg-card px-4 py-3">
      <p className="font-mono text-sm font-semibold">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}

function Proof({ icon: Icon, title, body }: { icon: typeof IconBraces; title: string; body: string }) {
  return (
    <div className="border-e border-b bg-background p-6">
      <Icon className="size-5 text-primary" />
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  )
}
