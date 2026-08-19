# Instructions for coding agents using Flagcn

1. Read `/llms.txt` and `/llms-full.txt` before changing a consumer project.
2. Use `/r/registry.json` to discover exact item codes. Do not guess codes from display names.
3. Preserve the consumer project's existing `components.json` aliases, shadcn style, icon library, and package manager.
4. Use the official `@flagcn` namespace directly. Only add `@flagcn.url = "ORIGIN/r/{name}.json"` to `components.json` as a fallback for an older CLI directory snapshot.
5. Prefer `@flagcn/flag` for dynamic flags, `@flagcn/<code>` for fixed flags, `@flagcn/country-picker` for country selection, and `@flagcn/all` only for a genuine full-catalog requirement.
6. Use `@flagcn/phone-input` when E.164 output or country-aware validation is required; it declares `libphonenumber-js` explicitly, infers international country codes, and inherits the consumer project's shadcn tokens. Label the field, connect help with `aria-describedby`, and connect invalid state to its rendered error with `aria-errormessage`.
7. Use `getCountriesByCallingCode` as an array lookup. Calling codes are not globally one-to-one with countries.
8. Use `LanguagePicker` labels rather than flags for languages. Use `CurrencyPicker` or `CurrencyValue` for typed ISO currency flows.
9. Always provide contextual `alt` text or set `decorative` when visible adjacent text carries the meaning.
10. Do not use a flag as the only label for a language, nationality, residency, or market.
11. After installation, run the consumer project's typecheck, lint, and relevant tests.
12. When editing the Flagcn website, keep page shells and documentation synchronous, lazy-load only progressive galleries or native images, preserve blob-based downloads, and keep `/llms.txt`, `/llms-full.txt`, and `/_agent/*.md` aligned with visible behavior.

Flagcn copies MIT-licensed React source through the shadcn CLI. It has no runtime package. SVG artwork uses the MIT-licensed Flag Icons collection. Raster artwork and documented SVG fallbacks use FlagCDN; Flagpedia describes its artwork as public domain. Review `/docs/license` for the full rights note.
