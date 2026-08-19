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
const featureFiles = [
  ["country-data", "src/components/flags/data/countries.ts", "registry:lib"],
  ["language-data", "src/components/flags/data/languages.ts", "registry:lib"],
  ["currency-data", "src/components/flags/data/currencies.ts", "registry:lib"],
  ["country-utils", "src/components/flags/country-utils.ts", "registry:lib"],
  ["language-utils", "src/components/flags/language-utils.ts", "registry:lib"],
  ["currency-utils", "src/components/flags/currency-utils.ts", "registry:lib"],
  ["search-picker", "src/components/flags/search-picker.tsx", "registry:component"],
  ["country-picker", "src/components/flags/country-picker.tsx", "registry:component"],
  ["country-select", "src/components/flags/country-select.tsx", "registry:component"],
  ["country-badge", "src/components/flags/country-badge.tsx", "registry:component"],
  ["flag-avatar", "src/components/flags/flag-avatar.tsx", "registry:component"],
  ["phone-input", "src/components/flags/phone-input.tsx", "registry:component"],
  ["language-picker", "src/components/flags/language-picker.tsx", "registry:component"],
  ["currency-picker", "src/components/flags/currency-picker.tsx", "registry:component"],
  ["currency", "src/components/flags/currency.tsx", "registry:component"],
  ["gcc", "src/components/flags/collections/gcc.ts", "registry:lib"],
  ["eu-collection", "src/components/flags/collections/eu.ts", "registry:lib"],
  ["collections", "src/components/flags/collections/index.ts", "registry:lib"],
]

function registryFile(path, type = "registry:component") {
  return { path, type, target: path.replace(/^src\//, "@") }
}

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
    ...featureFiles.map(([, path, type]) => registryFile(path, type)),
    ...flags.map((flag) => ({
      path: `src/components/flags/countries/${flag.code}.tsx`,
      type: "registry:component",
      target: `@components/flags/countries/${flag.code}.tsx`,
    })),
  ]
}

function coreItems(flags) {
  const core = [
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
      registryDependencies: ["@flagcn/flag", "@flagcn/country-data"],
      dependencies: ["@tabler/icons-react"],
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
      registryDependencies: ["button", "input", "badge", "avatar", "native-select"],
      dependencies: ["@tabler/icons-react", "libphonenumber-js"],
      files: allFiles(flags),
      categories: ["flags", "images", "forms", "internationalization"],
      docs: "Installs every flag wrapper. Import the core API from @/components/flags or named flags from @/components/flags/countries.",
      meta: { count: flags.length, includesAllFlags: true, license: "MIT", artworkLicense: "Public Domain" },
    },
  ]

  const item = ({ name, title, description, files, registryDependencies = [], dependencies = [], categories = ["internationalization"], docs, meta = {} }) => ({
    name,
    type: "registry:block",
    title,
    description,
    author: AUTHOR,
    ...(registryDependencies.length ? { registryDependencies } : {}),
    ...(dependencies.length ? { dependencies } : {}),
    files: files.map(([path, type]) => registryFile(path, type)),
    categories,
    docs,
    meta: { license: "MIT", ...meta },
  })

  return [...core,
    item({
      name: "country-data", title: "Country Data", description: "A generated and validated typed country dataset with ISO identifiers, native names, aliases, emoji, calling codes, currencies, and languages.",
      files: [["src/components/flags/data/countries.ts", "registry:lib"], ["src/components/flags/country-utils.ts", "registry:lib"]],
      categories: ["countries", "data", "internationalization"], docs: "Use getCountry, searchCountries, countryCodeToEmoji, emojiToCountryCode, and the shared-calling-code-safe lookup helpers.",
      meta: { count: 250, phoneCountryCount: 243, generated: true, validated: true, callingCodeLookupReturnsArrays: true },
    }),
    item({
      name: "calling-codes", title: "Calling Code Utilities", description: "Typed country calling-code helpers that correctly return every country sharing a calling code.",
      registryDependencies: ["@flagcn/country-data"], files: [["src/components/flags/country-utils.ts", "registry:lib"]],
      categories: ["countries", "phone", "utilities"], docs: "Use getCountryCallingCodes(code) or getCountriesByCallingCode('+1').", meta: { sharedCodes: true },
    }),
    item({
      name: "country-picker", title: "Country Picker", description: "A searchable country-only picker with flags, aliases, native names, ISO-3 codes, and calling-code search.",
      registryDependencies: ["@flagcn/flag-picker", "@flagcn/country-data"], files: [["src/components/flags/country-picker.tsx", "registry:component"]],
      categories: ["countries", "forms", "combobox"], docs: "Use countries to constrain the list and value/onValueChange for controlled state.", meta: { keyboard: true, searchable: true },
    }),
    item({
      name: "country-select", title: "Country Select", description: "A lightweight native country select with emoji and optional calling codes.",
      registryDependencies: ["native-select", "@flagcn/country-data"], files: [["src/components/flags/country-select.tsx", "registry:component"]],
      categories: ["countries", "forms", "select"], docs: "Use when native select behavior is preferable to a searchable picker.", meta: { native: true },
    }),
    item({
      name: "country-badge", title: "Country Badge", description: "A shadcn Badge composed with a flag and country name, ISO code, or calling code.",
      registryDependencies: ["badge", "@flagcn/flag", "@flagcn/country-data"], files: [["src/components/flags/country-badge.tsx", "registry:component"]],
      categories: ["countries", "badges", "display"], docs: "Set label to name, code, calling-code, or none.",
    }),
    item({
      name: "flag-avatar", title: "Flag Avatar", description: "A shadcn Avatar that renders a circular, resilient flag image with a typed fallback.",
      registryDependencies: ["avatar", "@flagcn/flag"], files: [["src/components/flags/flag-avatar.tsx", "registry:component"], ["src/components/flags/flag-data.ts", "registry:lib"]],
      categories: ["flags", "avatars", "display"], docs: "Pass any FlagCode and an optional accessible alt label.",
    }),
    item({
      name: "phone-input", title: "Phone Input", description: "A design-system-native international phone input with compact country search, inferred flags, as-you-type formatting, E.164 output, and validity metadata.",
      registryDependencies: ["input", "@flagcn/country-picker"], dependencies: ["libphonenumber-js"], files: [["src/components/flags/phone-input.tsx", "registry:component"]],
      categories: ["countries", "phone", "forms"], docs: "onValueChange receives E.164 when parseable plus formatted, possible, valid, calling-code, and international metadata. Controlled E.164 values infer their country.", meta: { e164: true, asYouType: true, countryInference: true, sizeVariants: ["sm", "default", "lg"] },
    }),
    item({
      name: "language-picker", title: "Language Picker", description: "A searchable language picker with native names and RTL metadata.",
      registryDependencies: ["button", "input", "badge"], dependencies: ["@tabler/icons-react"], files: [["src/components/flags/language-picker.tsx", "registry:component"], ["src/components/flags/search-picker.tsx", "registry:component"], ["src/components/flags/data/languages.ts", "registry:lib"]],
      categories: ["languages", "forms", "combobox"], docs: "Constrain the picker with languages and inspect RTL direction through language-utils.", meta: { count: 185, searchable: true, rtlAware: true },
    }),
    item({
      name: "currency-picker", title: "Currency Picker", description: "A searchable currency picker with ISO codes, localized names, and native symbols.",
      registryDependencies: ["button", "input", "badge"], dependencies: ["@tabler/icons-react"], files: [["src/components/flags/currency-picker.tsx", "registry:component"], ["src/components/flags/search-picker.tsx", "registry:component"], ["src/components/flags/data/currencies.ts", "registry:lib"]],
      categories: ["currencies", "forms", "combobox"], docs: "Use value/onValueChange with typed ISO currency codes.", meta: { count: 181, searchable: true },
    }),
    item({
      name: "currency", title: "Currency Components", description: "Typed currency labels and Intl.NumberFormat-backed currency values.",
      files: [["src/components/flags/currency.tsx", "registry:component"], ["src/components/flags/currency-utils.ts", "registry:lib"], ["src/components/flags/data/currencies.ts", "registry:lib"]],
      categories: ["currencies", "display", "utilities"], docs: "Use Currency for metadata labels and CurrencyValue for locale-aware amount formatting.",
    }),
    item({
      name: "gcc", title: "GCC Country Collection", description: "The six current Gulf Cooperation Council member country codes as a typed collection.",
      registryDependencies: ["@flagcn/country-data"], files: [["src/components/flags/collections/gcc.ts", "registry:lib"]],
      categories: ["countries", "collections", "gcc"], docs: "Use gccCountryCodes to constrain CountryPicker or isGccCountry for membership checks.", meta: { count: 6, verified: "2026-08-19" },
    }),
    item({
      name: "eu-collection", title: "EU Country Collection", description: "The 27 current European Union member country codes as a typed collection.",
      registryDependencies: ["@flagcn/country-data"], files: [["src/components/flags/collections/eu.ts", "registry:lib"]],
      categories: ["countries", "collections", "eu"], docs: "Use euCountryCodes to constrain CountryPicker or isEuCountry for membership checks.", meta: { count: 27, verified: "2026-08-19" },
    }),
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
