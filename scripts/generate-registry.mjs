import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const DATA_FILE = join(ROOT, "src/components/flags/flag-data.ts")
const COUNTRIES_DIR = join(ROOT, "src/components/flags/countries")
const COUNTRIES_INDEX_FILE = join(COUNTRIES_DIR, "index.ts")
const REGISTRY_FILE = join(ROOT, "registry.json")
const REGISTRY_URL = (process.env.REGISTRY_URL || "https://flagcn.dev").replace(/\/$/, "")
const AUTHOR = "Shadi Al Milhem"
const SPDX_HEADER = "// SPDX-License-Identifier: MIT\n\n"

function parseFlags() {
  const source = readFileSync(DATA_FILE, "utf8")
  const start = source.indexOf("export const flagNames = {")
  const end = source.indexOf("\n} as const", start)
  if (start < 0 || end < 0) throw new Error("Could not find flagNames in flag-data.ts")

  return source.slice(start, end).split("\n").flatMap((line) => {
    const match = line.match(/^\s+(?:"([^"]+)"|([a-z]{2})): (".*"),$/)
    if (!match) return []
    return [{ code: match[1] || match[2], name: JSON.parse(match[3]) }]
  })
}

function componentBase(name) {
  const words = name
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/&/g, " and ")
    .match(/[A-Za-z0-9]+/g) || []
  const base = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("")
  return `${/^\d/.test(base) ? "Flag" : ""}${base}`
}

function addComponentNames(flags) {
  const counts = new Map()
  for (const flag of flags) {
    const base = componentBase(flag.name)
    counts.set(base, (counts.get(base) ?? 0) + 1)
  }

  return flags.map((flag) => {
    const base = componentBase(flag.name)
    const qualifier = counts.get(base) > 1 && flag.code.includes("-")
      ? flag.code.startsWith("us-") ? "UsState" : flag.code.split("-").map(componentBase).join("")
      : ""
    return { ...flag, component: `${base}${qualifier}Flag` }
  })
}

function countrySource({ code, name, component }) {
  return `${SPDX_HEADER}import { Flag, type FlagProps } from "../flag"

export type ${component}Props = Omit<FlagProps, "code">

export function ${component}({ alt = "${name.replaceAll('"', '\\"')} flag", ...props }: ${component}Props) {
  return <Flag code="${code}" alt={alt} {...props} />
}
`
}

function countryIndexSource(flags) {
  return `${SPDX_HEADER}${flags.map((flag) => {
    return `export { ${flag.component}, type ${flag.component}Props } from "./${flag.code}"`
  }).join("\n")}\n`
}

function allFiles(flags) {
  return [
    { path: "src/components/flags/flag.tsx", type: "registry:ui", target: "@components/flags/flag.tsx" },
    { path: "src/components/flags/flag-utils.ts", type: "registry:lib", target: "@components/flags/flag-utils.ts" },
    { path: "src/components/flags/flag-picker.tsx", type: "registry:component", target: "@components/flags/flag-picker.tsx" },
    { path: "src/components/flags/flag-data.ts", type: "registry:lib", target: "@components/flags/flag-data.ts" },
    { path: "src/components/flags/index.ts", type: "registry:component", target: "@components/flags/index.ts" },
    { path: "src/components/flags/countries/index.ts", type: "registry:component", target: "@components/flags/countries/index.ts" },
    ...flags.map((flag) => ({
      path: `src/components/flags/countries/${flag.code}.tsx`,
      type: "registry:component",
      target: `@components/flags/countries/${flag.code}.tsx`,
    })),
  ]
}

function coreItems(flags) {
  return [
    {
      name: "flag",
      type: "registry:ui",
      title: "Flag",
      description: "An accessible no-crop flag image primitive with 4:3, 1:1, and original frames in SVG, PNG, WebP, or JPEG.",
      author: AUTHOR,
      files: [
        { path: "src/components/flags/flag.tsx", type: "registry:ui", target: "@components/flags/flag.tsx" },
        { path: "src/components/flags/flag-utils.ts", type: "registry:lib", target: "@components/flags/flag-utils.ts" },
      ],
      categories: ["flags", "images", "internationalization"],
      docs: "Pass a supported flag code and meaningful alt text. Use ratio='1x1' for square UI or ratio='4x3' for consistent cards. Set decorative when nearby text already names the place.",
      meta: {
        formats: ["svg", "png", "webp", "jpg"],
        ratios: ["4x3", "1x1", "original"],
        license: "MIT",
        artworkLicense: "Public Domain",
        source: "https://flagpedia.net",
        cdn: "https://flagcdn.com",
      },
    },
    {
      name: "flag-picker",
      type: "registry:block",
      title: "Flag Picker",
      description: "A searchable, keyboard-accessible flag combobox with typed country codes.",
      author: AUTHOR,
      registryDependencies: ["@flagcn/flag"],
      files: [
        { path: "src/components/flags/flag-picker.tsx", type: "registry:component", target: "@components/flags/flag-picker.tsx" },
        { path: "src/components/flags/flag-data.ts", type: "registry:lib", target: "@components/flags/flag-data.ts" },
      ],
      categories: ["flags", "combobox", "forms", "internationalization"],
      docs: "Use value/onValueChange for controlled state. Pass kinds=['country'] to omit subdivisions and organizations.",
      meta: { count: flags.length, keyboard: true, formCompatible: true, license: "MIT" },
    },
    {
      name: "all",
      type: "registry:block",
      title: "All Flagcn Components",
      description: `The flag primitive, picker, typed catalog, and all ${flags.length} individually named flag components.`,
      author: AUTHOR,
      files: allFiles(flags),
      categories: ["flags", "images", "forms", "internationalization"],
      docs: "Installs every flag wrapper. Import the core API from @/components/flags or named flags from @/components/flags/countries.",
      meta: { count: flags.length, includesAllFlags: true, license: "MIT", artworkLicense: "Public Domain" },
    },
  ]
}

function countryItem(flag) {
  return {
    name: flag.code,
    type: "registry:component",
    title: `${flag.name} Flag`,
    description: `A typed ${flag.name} flag component with no-crop 4:3 and 1:1 frames plus SVG, PNG, WebP, and JPEG support.`,
    author: AUTHOR,
    registryDependencies: ["@flagcn/flag"],
    files: [
      {
        path: `src/components/flags/countries/${flag.code}.tsx`,
        type: "registry:component",
        target: `@components/flags/countries/${flag.code}.tsx`,
      },
    ],
    categories: ["flags", "countries", "internationalization"],
    docs: `Import ${flag.component} from @/components/flags/countries/${flag.code}.`,
    meta: {
      code: flag.code,
      country: flag.name,
      formats: ["svg", "png", "webp", "jpg"],
      ratios: ["4x3", "1x1", "original"],
      license: "MIT",
      artworkLicense: "Public Domain",
    },
  }
}

const flags = addComponentNames(parseFlags())
if (flags.length !== 306) throw new Error(`Expected 306 flags from Flagpedia data, found ${flags.length}`)
if (new Set(flags.map((flag) => flag.component)).size !== flags.length) {
  throw new Error("Generated flag component names must be unique.")
}

rmSync(COUNTRIES_DIR, { recursive: true, force: true })
mkdirSync(COUNTRIES_DIR, { recursive: true })
for (const flag of flags) {
  writeFileSync(join(COUNTRIES_DIR, `${flag.code}.tsx`), countrySource(flag))
}
writeFileSync(COUNTRIES_INDEX_FILE, countryIndexSource(flags))

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "flagcn",
  homepage: REGISTRY_URL,
  items: [...coreItems(flags), ...flags.map(countryItem)],
}

writeFileSync(REGISTRY_FILE, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated ${flags.length} flag wrappers and ${registry.items.length} registry items.`)
