# Instructions for coding agents using Flagcn

1. Read `/llms.txt` and `/llms-full.txt` before changing a consumer project.
2. Use `/r/registry.json` to discover exact item codes. Do not guess codes from display names.
3. Preserve the consumer project's existing `components.json` aliases, shadcn style, icon library, and package manager.
4. If `@flagcn` is not globally recognized, add the registry origin as `@flagcn.url = "ORIGIN/r/{name}.json"` in `components.json`.
5. Prefer `@flagcn/flag` for dynamic data, `@flagcn/<code>` for fixed flags, `@flagcn/flag-picker` for selection, and `@flagcn/all` only for a full catalog requirement.
6. Always provide contextual `alt` text or set `decorative` when visible adjacent text carries the meaning.
7. Do not use a flag as the only label for a language, nationality, residency, or market.
8. After installation, run the consumer project's typecheck, lint, and relevant tests.

Flagcn copies MIT-licensed React source through the shadcn CLI. It has no runtime package. SVG artwork uses the MIT-licensed Flag Icons collection. Raster artwork and documented SVG fallbacks use FlagCDN; Flagpedia describes its artwork as public domain. Review `/docs/license` for the full rights note.
