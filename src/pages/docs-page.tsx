import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconFileText,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react"
import * as React from "react"
import type { ReactNode } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

import { Flag } from "@/components/flags/flag"
import { FlagPicker } from "@/components/flags/flag-picker"
import { CodeBlock } from "@/components/site/code-block"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { getRegistryConfig, getSiteOrigin } from "@/config/site"
import { cn } from "@/lib/utils"

type DocSlug =
  | "introduction"
  | "installation"
  | "flag"
  | "flag-picker"
  | "country-components"
  | "formats-and-ratios"
  | "styling"
  | "accessibility"
  | "ai-agents"
  | "license"

interface DocNavItem {
  slug: DocSlug
  label: string
}

interface DocNavGroup {
  label: string
  items: readonly DocNavItem[]
}

const docGroups: readonly DocNavGroup[] = [
  {
    label: "Getting started",
    items: [
      { slug: "introduction", label: "Introduction" },
      { slug: "installation", label: "Installation" },
    ],
  },
  {
    label: "Components",
    items: [
      { slug: "flag", label: "Flag" },
      { slug: "flag-picker", label: "Flag Picker" },
      { slug: "country-components", label: "Country components" },
    ],
  },
  {
    label: "Guides",
    items: [
      { slug: "formats-and-ratios", label: "Formats & ratios" },
      { slug: "styling", label: "Styling" },
      { slug: "accessibility", label: "Accessibility" },
      { slug: "ai-agents", label: "AI agents" },
    ],
  },
  {
    label: "Resources",
    items: [
      { slug: "license", label: "License & attribution" },
    ],
  },
]

const docSections = docGroups.flatMap((group) => group.items)

const tocBySlug: Record<DocSlug, string[]> = {
  introduction: ["What is Flagcn?", "Choose an install", "Principles"],
  installation: ["1. Add the registry", "2. Add a component", "3. Render a flag", "Available items"],
  flag: ["Install", "Usage", "API", "Format behavior"],
  "flag-picker": ["Install", "Usage", "API"],
  "country-components": ["Install one country", "Usage", "Why wrappers?", "Install every wrapper"],
  "formats-and-ratios": ["Formats", "Ratios", "Responsive raster images", "Choosing a combination"],
  styling: ["Class names", "Native image props", "Common recipes", "Loading behavior"],
  accessibility: ["Meaningful flags", "Decorative flags", "Do not use color alone"],
  "ai-agents": ["Machine-readable entry points", "Agent install workflow", "Registry discovery", "Prompt template"],
  license: ["Component source", "SVG artwork", "Raster artwork", "Attribution", "Official symbols"],
}

const registryConfigCode = (origin: string) => `{
  "registries": {
    "@flagcn": {
      "url": "${origin}/r/{name}.json"
    }
  }
}`

const docs: Record<DocSlug, { title: string; summary: string; content: ReactNode }> = {
  introduction: {
    title: "Introduction",
    summary: "A shadcn registry for flags that remain yours after installation.",
    content: (
      <>
        <DocSection title="What is Flagcn?">
          <p>Flagcn distributes React source through the shadcn CLI. It is not a component package and it does not put a UI abstraction between you and your code. Install a component, then edit it like any other file in your project.</p>
          <p>SVG artwork is served from the MIT-licensed Flag Icons collection. PNG, WebP, and JPEG artwork comes from Flagpedia’s FlagCDN. The core component constructs stable URLs, native responsive image attributes, and 4:3 or 1:1 presentation.</p>
        </DocSection>
        <DocSection title="Choose an install">
          <div className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MiniDocCard title="flag" text="The small, universal image primitive." command="@flagcn/flag" />
            <MiniDocCard title="flag-picker" text="Searchable, keyboard-friendly selection." command="@flagcn/flag-picker" />
            <MiniDocCard title="ae" text="A typed, country-specific wrapper." command="@flagcn/ae" />
            <MiniDocCard title="all" text="Every typed wrapper in one install." command="@flagcn/all" />
          </div>
        </DocSection>
        <DocSection title="Principles">
          <ul>
            <li>Source-owned components with no Flagcn runtime package.</li>
            <li>Explicit format selection and responsive raster sources.</li>
            <li>Accessible names and decorative-image support.</li>
            <li>Small install units so a single flag does not bring the catalog.</li>
          </ul>
        </DocSection>
      </>
    ),
  },
  installation: {
    title: "Installation",
    summary: "Connect the registry once, then add components by namespace.",
    content: <InstallationContent />,
  },
  flag: {
    title: "Flag",
    summary: "The format-aware primitive for every country, territory, and supported organization.",
    content: (
      <>
        <DocSection title="Install">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/flag" />
        </DocSection>
        <DocSection title="Usage">
          <CodeBlock code={`import { Flag } from "@/components/flags/flag"\n\nexport function Market() {\n  return (\n    <Flag\n      code="ae"\n      format="webp"\n      ratio="1x1"\n      width={160}\n      alt="United Arab Emirates flag"\n      className="ring-1 ring-border"\n    />\n  )\n}`} />
          <div className="not-prose flag-stage mt-4 grid min-h-44 place-items-center border bg-muted/35">
            <Flag code="ae" format="webp" ratio="1x1" width={160} alt="United Arab Emirates flag" className="size-24 object-contain ring-1 ring-border" />
          </div>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["code", "FlagCode | string", "Required", "Lowercase ISO-style code such as ae, jp, gb-eng, or us-ca."],
            ["alt", "string", "Generated", "Accessible image description. Use decorative for presentation-only flags."],
            ["format", "svg | png | webp | jpg", "svg", "Image format requested from Flag Icons or FlagCDN."],
            ["width", "number", "80", "Rendered width and the next suitable responsive CDN width."],
            ["ratio", "4x3 | 1x1 | original", "4x3", "Use a consistent landscape or square frame, or preserve official proportions."],
            ["decorative", "boolean", "false", "Sets empty alt text and aria-hidden."],
          ]} />
        </DocSection>
        <DocSection title="Format behavior">
          <p>SVG uses one scalable source. PNG, WebP, and JPEG add a width-based <code>srcSet</code>, letting the browser select a suitable raster asset. WebP is the best default for a raster-only pipeline; SVG is the best general default.</p>
          <p>The component forwards standard image props, including <code>className</code>, <code>style</code>, <code>onLoad</code>, <code>fetchPriority</code>, and <code>ref</code>. Ratio styling can still be refined with your own classes.</p>
        </DocSection>
      </>
    ),
  },
  "flag-picker": {
    title: "Flag Picker",
    summary: "A searchable combobox with full keyboard selection and typed values.",
    content: (
      <>
        <DocSection title="Install">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/flag-picker" />
          <p>The registry automatically installs <code>flag</code> and <code>flag-data</code>. The picker is icon-neutral, so it does not add an icon package to the consuming app.</p>
        </DocSection>
        <DocSection title="Usage">
          <CodeBlock code={`import * as React from "react"\nimport { FlagPicker } from "@/components/flags/flag-picker"\nimport type { FlagCode } from "@/components/flags/flag-data"\n\nexport function CountryField() {\n  const [country, setCountry] = React.useState<FlagCode>("ae")\n\n  return (\n    <FlagPicker\n      value={country}\n      onValueChange={setCountry}\n      kinds={["country"]}\n      name="country"\n    />\n  )\n}`} />
          <div className="not-prose mt-4 max-w-md rounded-lg border bg-card p-5">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Market</p>
            <FlagPicker defaultValue="ae" kinds={["country"]} />
          </div>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["value", "FlagCode", "Optional", "Controlled selected code."],
            ["defaultValue", "FlagCode", "Optional", "Initial code for uncontrolled usage."],
            ["onValueChange", "(code) => void", "Optional", "Called when the user selects a flag."],
            ["format", "svg | png | webp | jpg", "svg", "Preview format used inside the picker."],
            ["ratio", "4x3 | 1x1 | original", "4x3", "Preview ratio used in the trigger and results."],
            ["kinds", "FlagKind[]", "all", "Limit results to country, subdivision, or organization."],
            ["name", "string", "Optional", "Adds a hidden form field carrying the selected code."],
          ]} />
        </DocSection>
      </>
    ),
  },
  "country-components": {
    title: "Country components",
    summary: "Install a named wrapper when a fixed market is clearer than a dynamic code prop.",
    content: (
      <>
        <DocSection title="Install one country">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/ae" />
          <p>Each country item depends on the small universal <code>flag</code> item and installs a single typed wrapper into <code>components/flags/countries</code>.</p>
        </DocSection>
        <DocSection title="Usage">
          <CodeBlock code={`import { UnitedArabEmiratesFlag } from "@/components/flags/countries/ae"\n\nexport function Header() {\n  return (\n    <UnitedArabEmiratesFlag\n      format="svg"\n      width={32}\n      alt="Available in the UAE"\n    />\n  )\n}`} />
        </DocSection>
        <DocSection title="Why wrappers?">
          <p>Wrappers give design systems a descriptive import, lock the country code at compile time, and still preserve every <code>Flag</code> prop except <code>code</code>. Use the generic primitive for dynamic data and a wrapper for fixed interface chrome.</p>
        </DocSection>
        <DocSection title="Install every wrapper">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/all" />
          <p>This installs the primitive, picker, typed catalog, aggregate exports, and all 306 named wrappers. The generated barrel disambiguates duplicate place names such as Georgia and the U.S. state of Georgia.</p>
        </DocSection>
      </>
    ),
  },
  "formats-and-ratios": {
    title: "Formats & ratios",
    summary: "Choose the delivery format and visual frame independently for every flag.",
    content: (
      <>
        <DocSection title="Formats">
          <ApiTable rows={[
            ["svg", "Vector", "Default", "Sharp at every size and usually the best interface default."],
            ["png", "Raster", "Optional", "Broad tooling support with responsive width candidates."],
            ["webp", "Raster", "Optional", "Smaller raster delivery for pipelines that prefer modern images."],
            ["jpg", "Raster", "Optional", "Original-proportion JPEG delivery for tools that require it."],
          ]} />
          <CodeBlock code={`<Flag code="ae" format="svg" alt="United Arab Emirates flag" />\n<Flag code="ae" format="png" alt="United Arab Emirates flag" />\n<Flag code="ae" format="webp" alt="United Arab Emirates flag" />\n<Flag code="ae" format="jpg" alt="United Arab Emirates flag" />`} />
          <p>The catalog’s copy action uses the selected source format when the browser clipboard supports it. Browsers that cannot write WebP or JPEG clipboard items receive a PNG bitmap rendered from the selected source.</p>
        </DocSection>
        <DocSection title="Ratios">
          <p><code>4x3</code> is the default and gives mixed-country interfaces a stable landscape rhythm. <code>1x1</code> creates a square image box without cropping the flag. <code>original</code> preserves each flag’s official proportions.</p>
          <CodeBlock code={`<Flag code="ae" ratio="4x3" alt="United Arab Emirates flag" />\n<Flag code="ae" ratio="1x1" alt="United Arab Emirates flag" />\n<Flag code="ae" ratio="original" alt="United Arab Emirates flag" />`} />
        </DocSection>
        <DocSection title="Responsive raster images">
          <p>PNG, WebP, and JPEG use Flagpedia’s unmodified bitmap sources. They automatically receive a width-based <code>srcSet</code> and a matching default <code>sizes</code> value. Pass your own <code>sizes</code> when layout width changes across breakpoints.</p>
          <CodeBlock code={`<Flag\n  code="br"\n  format="webp"\n  width={160}\n  sizes="(max-width: 640px) 80px, 160px"\n  alt="Brazil flag"\n/>`} />
        </DocSection>
        <DocSection title="Choosing a combination">
          <ul>
            <li>Use SVG + 4:3 for most application interfaces.</li>
            <li>Use WebP + 1:1 for dense square market selectors that must preserve the whole flag.</li>
            <li>Use original when accurate national proportions are part of the content.</li>
            <li>Use PNG when a downstream tool cannot consume SVG or WebP.</li>
          </ul>
        </DocSection>
      </>
    ),
  },
  styling: {
    title: "Styling",
    summary: "Flagcn forwards native image props, so it fits the Tailwind and React patterns you already use.",
    content: (
      <>
        <DocSection title="Class names">
          <p>Pass <code>className</code> directly. Flagcn does not impose a component theme or wrapper element.</p>
          <CodeBlock code={`<Flag\n  code="jp"\n  ratio="1x1"\n  alt="Japan flag"\n  className="size-10 ring-1 ring-border"\n/>`} />
        </DocSection>
        <DocSection title="Native image props">
          <p>The component forwards <code>id</code>, <code>style</code>, <code>title</code>, <code>onLoad</code>, <code>onError</code>, <code>fetchPriority</code>, <code>crossOrigin</code>, data attributes, and the ref expected by React image elements.</p>
          <CodeBlock code={`<Flag\n  code="de"\n  alt="Germany flag"\n  fetchPriority="high"\n  onLoad={() => setReady(true)}\n  data-market="eu"\n/>`} />
        </DocSection>
        <DocSection title="Common recipes">
          <CodeBlock code={`// Compact label\n<span className="inline-flex items-center gap-2">\n  <Flag code="ca" width={24} decorative className="ring-1 ring-border" />\n  Canada\n</span>\n\n// Responsive card artwork\n<Flag\n  code="za"\n  width={320}\n  alt="South Africa flag"\n  className="h-auto w-full object-contain ring-1 ring-border"\n/>`} />
        </DocSection>
        <DocSection title="Loading behavior">
          <p>Images are lazy-loaded and asynchronously decoded by default. Override <code>loading="eager"</code> and <code>fetchPriority="high"</code> only for a flag that is important above the fold.</p>
        </DocSection>
      </>
    ),
  },
  "ai-agents": {
    title: "AI agents",
    summary: "Stable text files and JSON endpoints give coding agents the context they need without scraping the interface.",
    content: (
      <>
        <DocSection title="Machine-readable entry points">
          <ApiTable compact rows={[
            ["/llms.txt", "Index", "Short project map, install commands, API summary, and canonical resources."],
            ["/llms-full.txt", "Reference", "Complete agent-oriented usage, API, accessibility, and licensing guide."],
            ["/r/registry.json", "Registry", "The full shadcn registry index and every available item name."],
            ["/r/<name>.json", "Registry item", "The exact files and dependencies installed for one item."],
          ]} />
        </DocSection>
        <DocSection title="Agent install workflow">
          <ol>
            <li>Read <code>/llms.txt</code>, then open <code>/llms-full.txt</code> for the complete contract.</li>
            <li>Inspect <code>/r/registry.json</code> or the item JSON when exact generated files matter.</li>
            <li>Add the <code>@flagcn</code> URL to <code>components.json</code> when the namespace is not yet in the shadcn directory.</li>
            <li>Run the shadcn add command and edit the copied source normally.</li>
          </ol>
        </DocSection>
        <DocSection title="Registry discovery">
          <CodeBlock language="text" code={`${getSiteOrigin()}/llms.txt\n${getSiteOrigin()}/llms-full.txt\n${getSiteOrigin()}/r/registry.json\n${getSiteOrigin()}/r/ae.json`} />
          <p>Registry responses allow cross-origin reads, so browser-based tools can inspect the catalog directly. Stable item names such as <code>ae</code>, <code>us-ca</code>, <code>flag</code>, and <code>all</code> are preferable to guessing display names.</p>
        </DocSection>
        <DocSection title="Prompt template">
          <CodeBlock language="text" code={`Read ${getSiteOrigin()}/llms.txt and ${getSiteOrigin()}/llms-full.txt.\nAdd @flagcn/ae with the shadcn CLI, then render it as a decorative 1:1 WebP flag beside the visible label “United Arab Emirates”. Preserve the project’s existing component aliases and styling conventions.`} />
        </DocSection>
      </>
    ),
  },
  accessibility: {
    title: "Accessibility",
    summary: "Flags communicate identity visually, so their surrounding text and interaction matter.",
    content: (
      <>
        <DocSection title="Meaningful flags">
          <p>Describe what the image means in context, not only what it looks like. For a locale switcher, “Arabic: United Arab Emirates” is more useful than “striped flag.”</p>
          <CodeBlock code={`<Flag code="ae" alt="Arabic: United Arab Emirates" />`} />
        </DocSection>
        <DocSection title="Decorative flags">
          <p>When adjacent visible text already names the country, set <code>decorative</code>. The component emits empty alternative text and removes the image from the accessibility tree.</p>
          <CodeBlock code={`<span className="flex items-center gap-2">\n  <Flag code="am" decorative width={24} />\n  Armenia\n</span>`} />
        </DocSection>
        <DocSection title="Do not use color alone">
          <p>Never make a flag the only indication of language, residency, nationality, or state. Flags can be politically sensitive and do not always map one-to-one with languages. Pair them with precise text.</p>
        </DocSection>
      </>
    ),
  },
  license: {
    title: "License & attribution",
    summary: "Clear rights for the code and the artwork it displays.",
    content: (
      <>
        <DocSection title="Component source">
          <p>Flagcn’s original source code is released under the MIT License. Once the shadcn CLI copies a component into your application, it is yours to inspect and modify under those terms.</p>
        </DocSection>
        <DocSection title="SVG artwork">
          <p>Country, territory, and organization SVGs use Flag Icons 7.5.0 in its 4:3 and 1:1 variants. Flag Icons is released under the MIT License. U.S. state SVGs and original-proportion SVGs fall back to FlagCDN because Flag Icons does not provide those exact assets.</p>
          <a className="not-prose text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline" href="https://github.com/lipis/flag-icons/blob/main/LICENSE" target="_blank" rel="noreferrer">
            Read the Flag Icons license <IconExternalLink className="size-4" />
          </a>
        </DocSection>
        <DocSection title="Raster artwork">
          <p>PNG, WebP, and JPEG assets come from Flagpedia’s FlagCDN. Flagpedia states that its flag images are in the public domain and free for commercial and non-commercial use.</p>
          <a className="not-prose text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline" href="https://flagpedia.net/about" target="_blank" rel="noreferrer">
            Read Flagpedia’s license statement <IconExternalLink className="size-4" />
          </a>
        </DocSection>
        <DocSection title="Attribution">
          <p>Flagcn keeps both sources and their licenses visible. Keep the included third-party notice when redistributing the component source.</p>
        </DocSection>
        <DocSection title="Official symbols">
          <p>Public-domain artwork status does not replace local rules governing national flags, seals, or official emblems. Use symbols accurately and review the requirements that apply to your product and markets.</p>
        </DocSection>
      </>
    ),
  },
}

function InstallationContent() {
  const origin = getSiteOrigin()
  return (
    <>
      <DocSection title="1. Add the registry">
        <p>Add this entry to your project’s <code>components.json</code>. The namespace can be changed, but the examples use <code>flagcn</code>.</p>
        <CodeBlock language="json" code={registryConfigCode(origin)} />
      </DocSection>
      <DocSection title="2. Add a component">
        <CodeBlock language="bash" code={`pnpm dlx shadcn@latest add @flagcn/flag\n# or\nnpx shadcn@latest add @flagcn/flag`} />
      </DocSection>
      <DocSection title="3. Render a flag">
        <CodeBlock code={`import { Flag } from "@/components/flags/flag"\n\n<Flag code="ae" alt="United Arab Emirates flag" />`} />
      </DocSection>
      <DocSection title="Available items">
        <ApiTable rows={[
          ["@flagcn/flag", "Primitive", "Format-aware image component plus URL helpers."],
          ["@flagcn/flag-picker", "Block", "Searchable picker and the complete typed catalog."],
          ["@flagcn/all", "Block", "Primitive, picker, data, and all 306 named wrappers."],
          ["@flagcn/<code>", "Component", "A typed country or territory wrapper, e.g. @flagcn/ae."],
        ]} compact />
      </DocSection>
      <div className="not-prose border border-primary/25 bg-primary/5 p-4 text-sm">
        <strong>Registry endpoint:</strong> <code className="ms-1 text-muted-foreground">{getRegistryConfig()}</code>
      </div>
    </>
  )
}

function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={headingId(title)} className="scroll-mt-24 border-t pt-9 first:border-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h2>
      <div className="prose-doc mt-4 grid gap-4">{children}</div>
    </section>
  )
}

function headingId(title: string) {
  return title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function MiniDocCard({ title, text, command }: { title: string; text: string; command: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-xs text-primary">{title}</CardTitle>
        <CardDescription className="leading-6">{text}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate border-t pt-3 font-mono text-[10px] text-muted-foreground">{command}</p>
      </CardContent>
    </Card>
  )
}

function ApiTable({ rows, compact = false }: { rows: string[][]; compact?: boolean }) {
  return (
    <div className="not-prose overflow-x-auto border">
      <table className="w-full min-w-[560px] text-start text-sm">
        <thead className="bg-muted/40 text-xs text-muted-foreground">
          <tr>
            {compact ? <><th>Item</th><th>Type</th><th>Purpose</th></> : <><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row[0]}>
              <td className="font-mono text-xs text-primary">{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              {compact ? null : <td>{row[3]}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const currentSlug = (slug ?? "introduction") as DocSlug
  const doc = docs[currentSlug]
  const [query, setQuery] = React.useState("")

  if (!doc) return <Navigate to="/docs/introduction" replace />

  const currentIndex = docSections.findIndex((section) => section.slug === currentSlug)
  const previous = docSections[currentIndex - 1]
  const next = docSections[currentIndex + 1]
  const currentGroup = docGroups.find((group) => group.items.some((section) => section.slug === currentSlug))
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const agentPrompt = `Read ${getSiteOrigin()}/llms.txt and ${getSiteOrigin()}/llms-full.txt, then help me use Flagcn. I am currently reading the ${doc.title} guide at ${getSiteOrigin()}/docs/${currentSlug}. Preserve my project's existing shadcn aliases and styling conventions.`

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[1480px] border-x lg:grid-cols-[240px_minmax(0,820px)] xl:grid-cols-[240px_minmax(0,820px)_220px]">
      <aside className="hidden border-e bg-card/25 lg:block">
        <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-5 py-8">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">Documentation</p>
          <div className="relative mb-7">
            <IconSearch className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter docs…" aria-label="Filter documentation" className="h-9 bg-background ps-8 text-xs" />
          </div>
          <nav className="grid gap-5" aria-label="Documentation">
            {docGroups.map((group) => {
              const visibleItems = group.items.filter((section) => !normalizedQuery || section.label.toLocaleLowerCase().includes(normalizedQuery))
              if (!visibleItems.length) return null
              return (
                <div key={group.label}>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{group.label}</p>
                  <div className="grid gap-0.5">
                    {visibleItems.map((section) => (
                      <Link
                        key={section.slug}
                        to={`/docs/${section.slug}`}
                        className={cn(
                          "border-s-2 border-transparent px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground",
                          section.slug === currentSlug && "border-primary bg-accent font-medium text-foreground",
                        )}
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>
          {normalizedQuery && !docSections.some((section) => section.label.toLocaleLowerCase().includes(normalizedQuery)) ? (
            <p className="px-2 text-xs leading-5 text-muted-foreground">No documentation sections match.</p>
          ) : null}
        </div>
      </aside>

      <article className="min-w-0 px-5 py-10 sm:px-10 sm:py-14 lg:px-12">
        <div className="mb-9 lg:hidden">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Documentation section</p>
          <Select
            items={docSections.map((section) => ({ label: section.label, value: section.slug }))}
            value={currentSlug}
            onValueChange={(value) => navigate(`/docs/${value}`)}
          >
            <SelectTrigger aria-label="Documentation section" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {docSections.map((section) => (
                  <SelectItem key={section.slug} value={section.slug}>{section.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Docs <span className="mx-1.5 text-border">/</span> {currentGroup?.label}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{doc.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <CopyPageButton title={doc.title} />
          <a href="/llms-full.txt" target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <IconFileText data-icon="inline-start" /> Open text
          </a>
          <AskAiButton prompt={agentPrompt} />
        </div>
        <Separator className="my-9" />
        <div data-doc-content className="grid gap-12">{doc.content}</div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link to={`/docs/${previous.slug}`} className="flex items-center gap-3 border p-4 transition-colors hover:border-primary/35 hover:bg-accent/50">
              <IconArrowLeft className="size-4 text-muted-foreground" />
              <div>
                <span className="text-xs text-muted-foreground">Previous</span>
                <p className="mt-0.5 text-sm font-medium">{previous.label}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/docs/${next.slug}`} className="flex items-center justify-end gap-3 border p-4 text-end transition-colors hover:border-primary/35 hover:bg-accent/50">
              <div>
                <span className="text-xs text-muted-foreground">Next</span>
                <p className="mt-0.5 text-sm font-medium">{next.label}</p>
              </div>
              <IconArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ) : null}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Last updated August 16, 2026</p>
      </article>

      <aside className="hidden border-s bg-card/15 xl:block">
        <div className="sticky top-14 px-6 py-10">
          <p className="mb-3 text-xs font-medium">On this page</p>
          <nav className="grid gap-2 border-s ps-3" aria-label="On this page">
            {tocBySlug[currentSlug].map((heading) => (
              <a key={heading} href={`#${headingId(heading)}`} className="text-xs leading-5 text-muted-foreground transition-colors hover:text-foreground">
                {heading}
              </a>
            ))}
          </nav>
          <Separator className="my-5" />
          <p className="mb-2 text-xs font-medium">For agents</p>
          <div className="grid gap-1.5">
            <a href="/llms.txt" className="text-xs text-muted-foreground hover:text-foreground">llms.txt</a>
            <a href="/llms-full.txt" className="text-xs text-muted-foreground hover:text-foreground">llms-full.txt</a>
            <a href="/r/registry.json" className="text-xs text-muted-foreground hover:text-foreground">registry.json</a>
          </div>
        </div>
      </aside>
    </main>
  )
}

function CopyPageButton({ title }: { title: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copyPage() {
    const content = document.querySelector<HTMLElement>("[data-doc-content]")?.innerText ?? ""
    await navigator.clipboard.writeText(`# ${title}\n\n${content}\n\nSource: ${window.location.href}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button variant="outline" size="sm" onClick={copyPage}>
      {copied ? <IconCheck data-icon="inline-start" /> : <IconCopy data-icon="inline-start" />}
      {copied ? "Copied" : "Copy Markdown"}
    </Button>
  )
}

function AskAiButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button variant="outline" size="sm" onClick={copyPrompt}>
      {copied ? <IconCheck data-icon="inline-start" /> : <IconSparkles data-icon="inline-start" />}
      {copied ? "Prompt copied" : "Ask AI"}
    </Button>
  )
}
