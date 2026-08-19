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
import { CodeBlock } from "@/components/site/code-block"
import { ComponentExample } from "@/components/site/component-example"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { countryDataMeta } from "@/config/country-data-meta"
import { getRegistryConfig, getSiteOrigin, packageManagers, type PackageManager } from "@/config/site"
import { copyTextToClipboard } from "@/lib/copy-text"
import { cn } from "@/lib/utils"

const FlagPicker = React.lazy(() => import("@/components/flags/flag-picker").then((module) => ({ default: module.FlagPicker })))
const CountryBadge = React.lazy(() => import("@/components/flags/country-badge").then((module) => ({ default: module.CountryBadge })))
const CountryPicker = React.lazy(() => import("@/components/flags/country-picker").then((module) => ({ default: module.CountryPicker })))
const CountrySelect = React.lazy(() => import("@/components/flags/country-select").then((module) => ({ default: module.CountrySelect })))
const Currency = React.lazy(() => import("@/components/flags/currency").then((module) => ({ default: module.Currency })))
const CurrencyValue = React.lazy(() => import("@/components/flags/currency").then((module) => ({ default: module.CurrencyValue })))
const CurrencyPicker = React.lazy(() => import("@/components/flags/currency-picker").then((module) => ({ default: module.CurrencyPicker })))
const FlagAvatar = React.lazy(() => import("@/components/flags/flag-avatar").then((module) => ({ default: module.FlagAvatar })))
const LanguagePicker = React.lazy(() => import("@/components/flags/language-picker").then((module) => ({ default: module.LanguagePicker })))
const PhoneInput = React.lazy(() => import("@/components/flags/phone-input").then((module) => ({ default: module.PhoneInput })))

type DocSlug =
  | "introduction"
  | "installation"
  | "flag"
  | "flag-picker"
  | "country-picker"
  | "phone-input"
  | "country-display"
  | "locale-pickers"
  | "data-utilities"
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
      { slug: "country-picker", label: "Country selection" },
      { slug: "phone-input", label: "Phone Input" },
      { slug: "country-display", label: "Badges & avatars" },
      { slug: "locale-pickers", label: "Language & currency" },
    ],
  },
  {
    label: "Guides",
    items: [
      { slug: "formats-and-ratios", label: "Formats & ratios" },
      { slug: "styling", label: "Styling" },
      { slug: "accessibility", label: "Accessibility" },
      { slug: "ai-agents", label: "AI agents" },
      { slug: "data-utilities", label: "Data & utilities" },
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
  installation: ["1. Add the registry", "2. Add a component", "3. Render a flag", "Available items", "Installation through CLI", "Search and Discovery"],
  flag: ["Install", "Usage", "API", "Format behavior"],
  "flag-picker": ["Install", "Usage", "API"],
  "country-picker": ["CountryPicker", "CountrySelect", "Choosing a control", "API"],
  "phone-input": ["Install", "Usage", "Behavior", "Sizes", "Preset and international values", "Validation", "Read-only and disabled", "API"],
  "country-display": ["CountryBadge", "FlagAvatar", "Design-system behavior", "API"],
  "locale-pickers": ["LanguagePicker", "CurrencyPicker", "Currency display"],
  "data-utilities": ["Validated sources", "Country data", "Emoji and calling codes", "Phone countries", "GCC and EU collections"],
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
          <div className="not-prose grid gap-3 sm:grid-cols-2">
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
          <ComponentExample
            title="Square WebP flag"
            description="A no-crop square presentation using a responsive raster source."
            code={`import { Flag } from "@/components/flags/flag"

<Flag
  code="ae"
  format="webp"
  ratio="1x1"
  width={160}
  alt="United Arab Emirates flag"
  className="outline outline-1 outline-black/10"
/>`}
            className="not-prose mt-4"
            previewClassName="flag-stage bg-muted/35"
          >
            <Flag code="ae" format="webp" ratio="1x1" width={160} alt="United Arab Emirates flag" className="size-24 object-contain ring-1 ring-border" />
          </ComponentExample>
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
          <p>The registry automatically installs the flag primitive, typed country data, and the project-aligned Tabler icons used by the picker.</p>
        </DocSection>
        <DocSection title="Usage">
          <ComponentExample
            title="Controlled country picker"
            description="Searches country names and codes while a hidden form field carries the selected value."
            code={`const [country, setCountry] = React.useState<FlagCode>("ae")

<FlagPicker
  value={country}
  onValueChange={setCountry}
  kinds={["country"]}
  name="country"
  aria-label="Market"
/>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <Field className="mx-auto max-w-md"><FieldLabel>Market</FieldLabel><FlagPicker defaultValue="ae" kinds={["country"]} aria-label="Market" /></Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["value", "FlagCode", "Optional", "Controlled selected code."],
            ["defaultValue", "FlagCode", "Optional", "Initial code for uncontrolled usage."],
            ["onValueChange", "(code) => void", "Optional", "Called when the user selects a flag."],
            ["format", "svg | png | webp | jpg", "svg", "Preview format used inside the picker."],
            ["ratio", "4x3 | 1x1 | original", "4x3", "Preview ratio used in the trigger and results."],
            ["kinds", "FlagKind[]", "all", "Limit results to country, subdivision, or organization."],
            ["codes", "FlagCode[]", "all", "Constrain results to an explicit set of flags."],
            ["disabledCodes", "FlagCode[]", "[]", "Keep specific flags visible but unavailable."],
            ["showCallingCode", "boolean", "false", "Show calling codes for country results."],
            ["name", "string", "Optional", "Adds a hidden form field carrying the selected code."],
            ["aria-label", "string", "placeholder", "Sets the accessible name for the combobox trigger."],
          ]} />
        </DocSection>
      </>
    ),
  },
  "country-picker": {
    title: "Country selection",
    summary: "Searchable and native country controls that inherit the shadcn theme already configured in your project.",
    content: (
      <>
        <DocSection title="CountryPicker">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/country-picker" />
          <ComponentExample
            title="Country picker with calling codes"
            description="Search by English or native name, ISO code, alias, or calling code."
            code={`<CountryPicker
  defaultValue="ae"
  name="country"
  showCallingCode
  aria-label="Billing country"
/>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <Field className="mx-auto max-w-md"><FieldLabel>Billing country</FieldLabel><CountryPicker defaultValue="ae" showCallingCode aria-label="Billing country" /></Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="CountrySelect">
          <p>The native variant is the smallest option and preserves platform selection behavior. It uses the same typed country dataset.</p>
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/country-select" />
          <ComponentExample
            title="Native country select"
            description="Uses the platform picker and includes calling codes in each label."
            code={`<CountrySelect
  defaultValue="sa"
  showCallingCode
  aria-label="Country"
  className="w-full"
/>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <Field className="mx-auto max-w-sm"><FieldLabel>Country</FieldLabel><CountrySelect defaultValue="sa" showCallingCode aria-label="Country" className="w-full" /></Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="Choosing a control">
          <ul>
            <li>Use <code>CountryPicker</code> for searchable forms, long lists, native-name search, and calling-code discovery.</li>
            <li>Use <code>CountrySelect</code> when native mobile behavior and minimal JavaScript matter most.</li>
            <li>Constrain either control with a typed <code>countries</code> array such as <code>gccCountryCodes</code>.</li>
          </ul>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["value", "CountryCode", "Optional", "Controlled ISO alpha-2 code in lowercase."],
            ["defaultValue", "CountryCode", "Optional", "Initial value for uncontrolled use."],
            ["countries", "CountryCode[]", "all", "Typed allow-list used to constrain the options."],
            ["showCallingCode", "boolean", "false", "Shows the primary calling code next to each country."],
            ["onValueChange", "(code) => void", "Optional", "Called with the selected typed country code."],
          ]} />
        </DocSection>
      </>
    ),
  },
  "phone-input": {
    title: "Phone Input",
    summary: "An integrated international phone field with country search, E.164 output, live metadata, and design-system-native styling.",
    content: (
      <>
        <DocSection title="Install">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/phone-input" />
          <p>The installed source composes your project’s shadcn Input styling and semantic tokens. There is no Flagcn theme layer to fight.</p>
        </DocSection>
        <DocSection title="Usage">
          <ComponentExample
            title="Default phone field"
            description="Formats a national number as the user types and emits E.164 when parseable."
            code={`<PhoneInput
  defaultCountry="ae"
  placeholder="50 123 4567"
  onValueChange={(value, meta) => {
    console.log(value, meta.valid, meta.international)
  }}
/>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <Field className="mx-auto max-w-md">
              <FieldLabel htmlFor="phone-default">Phone number</FieldLabel>
              <PhoneInput id="phone-default" defaultCountry="ae" placeholder="50 123 4567" aria-describedby="phone-default-description" />
              <FieldDescription id="phone-default-description">Enter a UAE mobile or landline number.</FieldDescription>
            </Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="Behavior">
          <p>The field formats national numbers as you type, normalizes an international <code>00</code> prefix to <code>+</code>, and updates the selected flag when an international number identifies another country. Controlled E.164 values are parsed back into the visible country and local format.</p>
        </DocSection>
        <DocSection title="Sizes">
          <ComponentExample
            title="Small, default, and large"
            description="The size prop changes the selector, calling code, input height, padding, and text together."
            code={`<FieldGroup>
  <PhoneInput size="sm" defaultCountry="gb" placeholder="Small" />
  <PhoneInput defaultCountry="gb" placeholder="Default" />
  <PhoneInput size="lg" defaultCountry="gb" placeholder="Large" />
</FieldGroup>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <FieldGroup className="mx-auto max-w-md">
              <Field><FieldLabel htmlFor="phone-small">Small</FieldLabel><PhoneInput id="phone-small" size="sm" defaultCountry="gb" placeholder="7400 123456" /></Field>
              <Field><FieldLabel htmlFor="phone-medium">Default</FieldLabel><PhoneInput id="phone-medium" defaultCountry="gb" placeholder="7400 123456" /></Field>
              <Field><FieldLabel htmlFor="phone-large">Large</FieldLabel><PhoneInput id="phone-large" size="lg" defaultCountry="gb" placeholder="7400 123456" /></Field>
            </FieldGroup>
          </ComponentExample>
        </DocSection>
        <DocSection title="Preset and international values">
          <div className="not-prose grid gap-4">
            <ComponentExample
              title="Preset E.164 value"
              description="Infers the UAE country and displays the controlled value nationally."
              code={`<PhoneInput value="+971501234567" readOnly />`}
              previewClassName="justify-items-stretch"
            >
              <Field><FieldLabel htmlFor="phone-preset">Preset number</FieldLabel><PhoneInput id="phone-preset" value="+971501234567" readOnly /></Field>
            </ComponentExample>
            <ComponentExample
              title="International display"
              description="Keeps the full international prefix visible in the input."
              code={`<PhoneInput
  value="+14155552671"
  displayFormat="international"
  readOnly
/>`}
              previewClassName="justify-items-stretch"
            >
              <Field><FieldLabel htmlFor="phone-international">International number</FieldLabel><PhoneInput id="phone-international" value="+14155552671" displayFormat="international" readOnly /></Field>
            </ComponentExample>
          </div>
        </DocSection>
        <DocSection title="Validation">
          <ComponentExample
            title="Invalid number"
            description="Set data-invalid on Field, aria-invalid on PhoneInput, and render a real error message."
            code={`<Field data-invalid>
  <FieldLabel htmlFor="phone-invalid">Phone number</FieldLabel>
  <PhoneInput
    id="phone-invalid"
    defaultCountry="sa"
    defaultValue="123"
    aria-invalid
    aria-errormessage="phone-invalid-error"
  />
  <FieldError id="phone-invalid-error">Enter a valid Saudi phone number.</FieldError>
</Field>`}
            className="not-prose mt-4"
            previewClassName="justify-items-stretch"
          >
            <Field data-invalid className="mx-auto max-w-md">
              <FieldLabel htmlFor="phone-invalid">Phone number</FieldLabel>
              <PhoneInput id="phone-invalid" defaultCountry="sa" defaultValue="123" aria-invalid aria-errormessage="phone-invalid-error" />
              <FieldError id="phone-invalid-error">Enter a valid Saudi phone number.</FieldError>
            </Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="Read-only and disabled">
          <div className="not-prose grid gap-4">
            <ComponentExample
              title="Read-only"
              description="The value remains selectable while editing and country changes are prevented."
              code={`<PhoneInput value="+14155552671" readOnly />`}
              previewClassName="justify-items-stretch"
            >
              <Field><FieldLabel htmlFor="phone-readonly">Account phone</FieldLabel><PhoneInput id="phone-readonly" value="+14155552671" readOnly /></Field>
            </ComponentExample>
            <ComponentExample
              title="Disabled"
              description="Both the country selector and phone field are unavailable."
              code={`<Field data-disabled>
  <FieldLabel htmlFor="phone-disabled">Phone number</FieldLabel>
  <PhoneInput id="phone-disabled" defaultCountry="de" disabled />
</Field>`}
              previewClassName="justify-items-stretch"
            >
              <Field data-disabled><FieldLabel htmlFor="phone-disabled">Phone number</FieldLabel><PhoneInput id="phone-disabled" defaultCountry="de" disabled /></Field>
            </ComponentExample>
          </div>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["value", "string", "Optional", "Controlled national, international, or E.164 value."],
            ["country", "PhoneCountryCode", "Inferred", "Controlled selected country supported by phone metadata."],
            ["countries", "PhoneCountryCode[]", String(countryDataMeta.phoneCountryCount), "Countries supported by libphonenumber metadata."],
            ["displayFormat", "national | international", "national", "Visible format for parseable controlled values."],
            ["size", "sm | default | lg", "default", "Matches common shadcn field sizing."],
            ["onValueChange", "(value, meta) => void", "Optional", "Returns E.164 when parseable plus validation and formatting metadata."],
          ]} />
        </DocSection>
      </>
    ),
  },
  "country-display": {
    title: "Country badges & avatars",
    summary: "Compact country identity components composed from the Badge and Avatar primitives already in your shadcn project.",
    content: (
      <>
        <DocSection title="CountryBadge">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/country-badge" />
          <ComponentExample
            title="Badge labels and variants"
            description="Choose a country name, ISO code, calling code, or flag-only label. Badge variants come from your project."
            code={`<CountryBadge code="ae" />
<CountryBadge code="sa" label="code" variant="outline" />
<CountryBadge code="qa" label="calling-code" variant="secondary" />
<CountryBadge code="kw" label="none" aria-label="Kuwait" />`}
            className="not-prose mt-4"
            previewClassName="flex min-h-32 flex-wrap content-center gap-2"
          >
            <CountryBadge code="ae" />
            <CountryBadge code="sa" label="code" variant="outline" />
            <CountryBadge code="qa" label="calling-code" variant="secondary" />
            <CountryBadge code="kw" label="none" aria-label="Kuwait" />
          </ComponentExample>
        </DocSection>
        <DocSection title="FlagAvatar">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/flag-avatar" />
          <ComponentExample
            title="Avatar sizes"
            description="Small, default, and large sizes are inherited from the installed shadcn Avatar primitive."
            code={`<FlagAvatar code="ae" size="sm" />
<FlagAvatar code="jp" />
<FlagAvatar code="br" size="lg" />`}
            className="not-prose mt-4"
            previewClassName="flex min-h-32 items-center gap-3"
          >
            <FlagAvatar code="ae" size="sm" />
            <FlagAvatar code="jp" />
            <FlagAvatar code="br" size="lg" />
          </ComponentExample>
        </DocSection>
        <DocSection title="Design-system behavior">
          <p>Both components use semantic shadcn variants, borders, radius, foreground colors, and focus behavior. After installation, changing your project theme changes these components with it.</p>
        </DocSection>
        <DocSection title="API">
          <ApiTable rows={[
            ["code", "CountryCode | FlagCode", "Required", "Country or supported flag shown by the component."],
            ["label", "name | code | calling-code | none", "name", "CountryBadge text treatment."],
            ["variant", "Badge variant", "secondary", "Uses the Badge variants defined in your project."],
            ["alt", "string", "Generated", "Accessible image name for FlagAvatar."],
          ]} />
        </DocSection>
      </>
    ),
  },
  "locale-pickers": {
    title: "Language & currency",
    summary: "Searchable locale controls with native labels, RTL awareness, symbols, and typed values.",
    content: (
      <>
        <DocSection title="LanguagePicker">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/language-picker" />
          <ComponentExample title="Language with native label" description="Searches English and native names and exposes RTL metadata." code={`<LanguagePicker defaultValue="ar" aria-label="Language" />`} className="not-prose mt-4" previewClassName="justify-items-stretch">
            <Field className="mx-auto max-w-md"><FieldLabel>Language</FieldLabel><LanguagePicker defaultValue="ar" aria-label="Language" /></Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="CurrencyPicker">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/currency-picker" />
          <ComponentExample title="Currency picker" description="Searches ISO codes, currency names, and native symbols." code={`<CurrencyPicker defaultValue="AED" aria-label="Currency" />`} className="not-prose mt-4" previewClassName="justify-items-stretch">
            <Field className="mx-auto max-w-md"><FieldLabel>Currency</FieldLabel><CurrencyPicker defaultValue="AED" aria-label="Currency" /></Field>
          </ComponentExample>
        </DocSection>
        <DocSection title="Currency display">
          <ComponentExample title="Metadata and formatted value" description="CurrencyValue delegates locale-sensitive formatting to Intl.NumberFormat." code={`<Currency code="AED" display="name" />
<CurrencyValue amount={2499} currency="AED" locale="en-AE" />`} className="not-prose mt-4" previewClassName="flex min-h-28 items-center gap-3 text-sm">
            <Currency code="AED" display="name" /><Separator orientation="vertical" className="h-4" /><CurrencyValue amount={2499} currency="AED" locale="en-AE" />
          </ComponentExample>
        </DocSection>
      </>
    ),
  },
  "data-utilities": {
    title: "Data & utilities",
    summary: "Validated country metadata, reversible emoji conversion, phone-aware subsets, shared calling codes, and maintained regional collections.",
    content: (
      <>
        <DocSection title="Validated sources">
          <p>The generated dataset currently contains <strong>{countryDataMeta.countryCount} flag-backed country and territory records</strong>. ISO alpha-2, alpha-3, and numeric identifiers come from <code>{countryDataMeta.sources.iso}</code>; names, native names, capitals, currencies, and languages come from <code>{countryDataMeta.sources.countries}</code>; phone support and calling codes come from <code>{countryDataMeta.sources.phone}</code>.</p>
          <p>Generation fails on duplicate identifiers, broken emoji round-trips, unknown language or currency references, or calling-code disagreements with the phone metadata. The generated <code>countryDataMeta</code> object exposes source versions and validation status.</p>
        </DocSection>
        <DocSection title="Country data">
          <CodeBlock language="bash" code="pnpm dlx shadcn@latest add @flagcn/country-data" />
          <CodeBlock code={`import { getCountry, searchCountries } from "@/components/flags/country-utils"

getCountry("ae")?.alpha3 // "ARE"
getCountryByAlpha2("AE")?.name // "United Arab Emirates"
searchCountries("dirham") // countries using AED`} />
        </DocSection>
        <DocSection title="Emoji and calling codes">
          <CodeBlock code={`countryCodeToEmoji("AE") // "🇦🇪"
emojiToCountryCode("🇦🇪") // "ae"
getCountriesByCallingCode("+1") // returns every matching country`} />
          <p>Calling-code lookups return arrays because codes such as <code>+1</code> and <code>+7</code> are shared.</p>
        </DocSection>
        <DocSection title="Phone countries">
          <p><code>phoneCountryCodes</code> contains the {countryDataMeta.phoneCountryCount} countries and territories supported by the installed libphonenumber metadata. <code>PhoneInput</code> uses this narrower list by default so every selectable option can be parsed and validated.</p>
          <CodeBlock code={`import { isPhoneCountryCode, phoneCountryCodes } from "@/components/flags/country-utils"

isPhoneCountryCode("ae") // true
<CountryPicker countries={phoneCountryCodes} />`} />
        </DocSection>
        <DocSection title="GCC and EU collections">
          <CodeBlock language="bash" code={`pnpm dlx shadcn@latest add @flagcn/gcc
pnpm dlx shadcn@latest add @flagcn/eu-collection`} />
          <CodeBlock code={`<CountryPicker countries={gccCountryCodes} />
isEuCountry("de") // true`} />
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
          <p><code>4x3</code> is the default and gives mixed-country interfaces a stable landscape rhythm. <code>1x1</code> creates a square image box without cropping the flag. <code>original</code> preserves each flag’s source proportions.</p>
          <p><strong>Original does not mean raster.</strong> With <code>format="svg"</code>, Flagcn requests the original-proportion SVG from FlagCDN. Format and proportions remain independent controls.</p>
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
            ["/openapi.json", "OpenAPI", "The machine-readable registry endpoint contract."],
            ["/.well-known/api-catalog", "Discovery", "The RFC 9727 API catalog with docs, schema, and health relations."],
          ]} />
        </DocSection>
        <DocSection title="Agent install workflow">
          <ol>
            <li>Read <code>/llms.txt</code>, then open <code>/llms-full.txt</code> for the complete contract.</li>
            <li>Inspect <code>/r/registry.json</code> or the item JSON when exact generated files matter.</li>
            <li>Use the official <code>@flagcn</code> namespace directly. Add its URL only when supporting an older CLI directory snapshot.</li>
            <li>Run the shadcn add command and edit the copied source normally.</li>
          </ol>
        </DocSection>
        <DocSection title="Registry discovery">
          <CodeBlock language="text" code={`${getSiteOrigin()}/llms.txt\n${getSiteOrigin()}/llms-full.txt\n${getSiteOrigin()}/.well-known/api-catalog\n${getSiteOrigin()}/openapi.json\n${getSiteOrigin()}/r/registry.json\n${getSiteOrigin()}/r/ae.json`} />
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
      <DocSection title="1. Add a component">
        <p>The official shadcn Registry Directory recognizes <code>@flagcn</code>, so current CLI releases need no registry setup.</p>
        <CodeBlock language="bash" code={`pnpm dlx shadcn@latest add @flagcn/flag\n# or\nnpx shadcn@latest add @flagcn/flag`} />
      </DocSection>
      <DocSection title="2. Older CLI compatibility">
        <p>If an older CLI directory snapshot does not recognize <code>@flagcn</code>, add this compatibility entry to <code>components.json</code>.</p>
        <CodeBlock language="json" code={registryConfigCode(origin)} />
      </DocSection>
      <DocSection title="3. Render a flag">
        <CodeBlock code={`import { Flag } from "@/components/flags/flag"\n\n<Flag code="ae" alt="United Arab Emirates flag" />`} />
      </DocSection>
      <DocSection title="Available items">
        <ApiTable rows={[
          ["@flagcn/flag", "Primitive", "Format-aware image component plus URL helpers."],
          ["@flagcn/flag-picker", "Block", "Searchable picker and the complete typed catalog."],
          ["@flagcn/country-picker", "Block", "Country-only search with aliases, ISO-3, native names, and calling codes."],
          ["@flagcn/phone-input", "Block", "Country-aware phone entry with E.164 and validity metadata."],
          ["@flagcn/language-picker", "Block", "Searchable language selection with RTL metadata."],
          ["@flagcn/currency-picker", "Block", "Searchable ISO currency selection with native symbols."],
          ["@flagcn/country-data", "Library", "Typed countries plus emoji, search, and calling-code utilities."],
          ["@flagcn/all", "Block", "Every primitive, locale component, utility, collection, and all 306 flag wrappers."],
          ["@flagcn/<code>", "Component", "A typed country or territory wrapper, e.g. @flagcn/ae."],
        ]} compact />
      </DocSection>
      <DocSection title="Installation through CLI">
        <p>Once the <code>@flagcn</code> registry is configured, install an item from your project root. The CLI resolves dependencies and copies editable source into your existing component paths.</p>
        <div className="not-prose grid gap-4 lg:grid-cols-2">
          <CliDocCard
            title="Install one flag"
            description="Use a lowercase ISO-style code to add one typed wrapper and its small core dependency."
            command="shadcn@latest add @flagcn/ae"
          />
          <CliDocCard
            title="Install the complete catalog"
            description="Add the primitive, picker, typed data, exports, and every available flag wrapper."
            command="shadcn@latest add @flagcn/all"
          />
        </div>
        <p>You can also install directly from the registry endpoint when a tool does not resolve namespaces yet.</p>
        <CliCommand command={`shadcn@latest add ${origin}/r/ae.json`} />
      </DocSection>
      <DocSection title="Search and Discovery">
        <p>Inspect registry items before installing them. The shadcn CLI can show one item, search names and descriptions, or list the complete Flagcn catalog.</p>
        <CliDocCard
          title="View"
          description="Preview an item’s files, dependencies, and registry metadata."
          command="shadcn@latest view @flagcn/ae"
        />
        <CliDocCard
          title="Search"
          description="Find flags and utilities by code, display name, or description."
          command={'shadcn@latest search @flagcn -q "United Arab Emirates"'}
        />
        <CliDocCard
          title="List"
          description="Browse every installable item exposed by the Flagcn registry."
          command="shadcn@latest list @flagcn"
        />
        <p>These commands read registry metadata only. Install with <code>add</code> after you have confirmed the item and its dependencies.</p>
      </DocSection>
      <div className="not-prose border border-primary/25 bg-primary/5 p-4 text-sm">
        <strong>Registry endpoint:</strong> <code className="ms-1 break-all text-muted-foreground">{getRegistryConfig()}</code>
      </div>
    </>
  )
}

function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={headingId(title)} className="min-w-0 scroll-mt-24 border-t pt-9 first:border-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h2>
      <div className="prose-doc mt-4 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">{children}</div>
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
        <CardTitle className="font-mono text-xs font-medium text-foreground">{title}</CardTitle>
        <CardDescription className="leading-6">{text}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate border-t pt-3 font-mono text-[10px] text-muted-foreground">{command}</p>
      </CardContent>
    </Card>
  )
}

function CliDocCard({ title, description, command }: { title: string; description: string; command: string }) {
  return (
    <Card className="not-prose min-w-0">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CliCommand command={command} />
      </CardContent>
    </Card>
  )
}

function CliCommand({ command }: { command: string }) {
  return (
    <Tabs defaultValue="pnpm" className="min-w-0 flex-col gap-2">
      <TabsList aria-label="Package manager" className="w-fit">
        {packageManagers.map((manager) => (
          <TabsTrigger key={manager} value={manager} className="font-mono text-xs">
            {manager}
          </TabsTrigger>
        ))}
      </TabsList>
      {packageManagers.map((manager) => (
        <TabsContent key={manager} value={manager} className="m-0 min-w-0">
          <CodeBlock language="bash" code={`${cliPrefix(manager)} ${command}`} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function cliPrefix(packageManager: PackageManager) {
  const prefixes: Record<PackageManager, string> = {
    pnpm: "pnpm dlx",
    npm: "npx",
    yarn: "yarn dlx",
    bun: "bunx --bun",
  }

  return prefixes[packageManager]
}

function ApiTable({ rows, compact = false }: { rows: string[][]; compact?: boolean }) {
  if (!rows.length) {
    return (
      <Empty className="not-prose min-h-40 border">
        <EmptyHeader>
          <EmptyTitle>No API entries</EmptyTitle>
          <EmptyDescription>This reference does not expose any entries yet.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="not-prose w-full min-w-0 max-w-full overflow-x-auto border">
      <table className="w-full min-w-[560px] text-start text-sm">
        <thead className="bg-muted/40 text-xs text-muted-foreground">
          <tr>
            {compact ? <><th>Item</th><th>Type</th><th>Purpose</th></> : <><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row[0]}>
              <td className="font-mono text-xs font-medium text-foreground">{row[0]}</td>
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
          <NativeSelect
            value={currentSlug}
            onChange={(event) => navigate(`/docs/${event.target.value}`)}
            aria-label="Documentation section"
            className="w-full"
          >
            {docSections.map((section) => (
              <NativeSelectOption key={section.slug} value={section.slug}>{section.label}</NativeSelectOption>
            ))}
          </NativeSelect>
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
        <div data-doc-content className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12">{doc.content}</div>

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
        <p className="mt-8 text-xs text-muted-foreground">Last updated August 19, 2026</p>
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
    await copyTextToClipboard(`# ${title}\n\n${content}\n\nSource: ${window.location.href}`)
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
    await copyTextToClipboard(prompt)
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
