# Flagcn

[![CI](https://github.com/shadi-almilhem/flagcn/actions/workflows/ci.yml/badge.svg)](https://github.com/shadi-almilhem/flagcn/actions/workflows/ci.yml)

Made by [Shadi Al Milhem](https://shadialmilhem.com) · [@shadi_m02](https://x.com/shadi_m02)

Flagcn is a source-owned shadcn registry for accessible flags. It ships a small React image primitive, a searchable picker, and one installable wrapper for every flag in the catalog. SVG assets use [Flag Icons](https://flagicons.lipis.dev/) in 4:3 and 1:1 variants. PNG, WebP, and JPEG assets use [Flagpedia's FlagCDN](https://flagpedia.net/download/api). U.S. state SVGs and original-proportion SVGs use FlagCDN as a documented fallback.

## What is included

- `@flagcn/flag`: accessible, responsive SVG/PNG/WebP/JPEG primitive with 4:3 and square presentation.
- `@flagcn/flag-picker`: searchable keyboard-friendly selector.
- `@flagcn/all`: the core components, picker, catalog, and all 306 named flag wrappers.
- `@flagcn/<code>`: 306 individually installable country, territory, subdivision, and organization wrappers.
- A Vite + React landing page with package-manager install tabs and a complete filterable catalog.
- Fumadocs-inspired documentation with grouped navigation, page outlines, copy actions, and AI-agent guidance.
- Machine-readable `/llms.txt`, `/llms-full.txt`, `/AGENTS.md`, and registry JSON endpoints.
- Registry generation, schema validation, unit tests, and a clean-consumer CLI install test.

## Local development

Requirements: Node.js 20 or newer and pnpm 10 or newer.

```bash
pnpm install
pnpm dev
```

The app follows shadcn preset `b5dN5XYzA`: Base UI, Lyra, Mist base color, teal theme, Tabler icons, and DM Sans. The site is dark-first with zero-radius geometry.

## Build and verify

```bash
pnpm build
pnpm check
```

`pnpm build` regenerates every country wrapper, runs `shadcn build`, type-checks the app, and produces the static site. `pnpm check` additionally runs lint, unit tests, registry validation, and installs `@flagcn/ae` into a temporary clean consumer through the shadcn CLI.

After deployment, set `REGISTRY_TEST_ORIGIN` to the public origin and run `pnpm test:install` to repeat the clean-consumer test against the live registry.

Generated registry payloads live in `public/r`. Do not hand-edit the country wrappers or generated JSON; change the source data or generator and rebuild instead.

## Use the registry

Until the registry is listed in the official shadcn directory, users add its namespace to `components.json`:

```json
{
  "registries": {
    "@flagcn": {
      "url": "https://flagcn.dev/r/{name}.json"
    }
  }
}
```

Then install any item:

```bash
pnpm dlx shadcn@latest add @flagcn/flag
pnpm dlx shadcn@latest add @flagcn/flag-picker
pnpm dlx shadcn@latest add @flagcn/ae
pnpm dlx shadcn@latest add @flagcn/all
```

You can also configure the namespace with the CLI:

```bash
pnpm dlx shadcn@latest registry add @flagcn=https://flagcn.dev/r/{name}.json
```

After the public registry is deployed and accepted into the official shadcn Registry Directory, `@flagcn/*` can work globally without a local registry entry. Directory acceptance is an external review step; publishing this repository alone does not reserve the namespace.

## Component API

```tsx
import { Flag } from "@/components/flags/flag"

export function MarketFlag() {
  return (
    <Flag
      code="ae"
      ratio="1x1"
      width={40}
      alt="United Arab Emirates"
      className="ring-1 ring-border"
      onLoad={() => console.log("loaded")}
    />
  )
}
```

`Flag` forwards standard React image props such as `className`, `style`, `onLoad`, `fetchPriority`, and `ref`. Its own props are `code`, `format`, `width`, `ratio`, and `decorative`. Formats are `svg`, `png`, `webp`, and `jpg`. The default ratio is `4x3`; use `1x1` for a square box that preserves the full flag or `original` when the official proportions matter.

`@flagcn/all` also generates a collision-safe barrel, so similarly named entries such as Georgia and the U.S. state of Georgia remain separately typed.

## Configure for production

1. Set `REGISTRY_URL` to the final public origin when building.
2. Set `VITE_GITHUB_URL` when the public repository is ready.
3. Update the Pages origin in `.env.example` if you attach a custom domain.
4. If the brand or namespace changes, search for `flagcn` and update the registry generator, site config, docs, and install test together.
5. Deploy the `dist` directory to any static host. Preserve the SPA fallback while serving `/r/*.json` directly.

Example:

```bash
REGISTRY_URL=https://flagcn.dev \
VITE_GITHUB_URL=https://github.com/shadi-almilhem/flagcn \
pnpm build
```

## Deploy to Cloudflare Pages

Git deployment is the recommended production path:

1. Push the project to GitHub or GitLab.
2. In Cloudflare, open **Workers & Pages**, create a Pages project, and connect the repository.
3. Use `pnpm build` as the build command and `dist` as the output directory.
4. Set `NODE_VERSION=22`, `REGISTRY_URL=https://flagcn.dev`, and `VITE_GITHUB_URL=https://github.com/shadi-almilhem/flagcn` in the production environment.
5. After the first deployment, attach the custom domain from the Pages project's **Custom domains** tab.

For a manual deployment after `pnpm build`:

```bash
pnpm deploy:cloudflare
```

The included `public/_headers` applies registry CORS and security headers. `public/_redirects` preserves the React documentation routes, while `public/404.html` ensures that an invalid registry item returns an actual 404 response. Cloudflare copies all three files into `dist` during the Vite build.

## Registry structure

```text
registry.json                         source registry catalog
scripts/generate-registry.mjs        wrapper and catalog generator
scripts/check-registry.mjs           built payload validator
scripts/test-registry-install.mjs    clean shadcn consumer test
src/components/flags/                distributed component source
src/components/flags/countries/      generated fixed-code wrappers
public/r/                             generated installable JSON
src/pages/                            documentation and catalog UI
public/llms.txt                       concise AI-agent index
public/llms-full.txt                  complete machine-readable reference
public/AGENTS.md                      consumer-agent operating instructions
```

## Data and licensing

Original Flagcn source code is MIT licensed and distributed files carry an SPDX identifier. Country, territory, and organization SVGs are served from Flag Icons 7.5.0, which is MIT licensed and provides 4:3 and 1:1 variants. PNG, WebP, and JPEG assets come from Flagpedia's FlagCDN. Flagpedia states that its artwork is public domain and based on Wikimedia Commons files; see [Flagpedia's license statement](https://flagpedia.net/about). U.S. state SVGs and original-proportion SVGs also use FlagCDN because Flag Icons does not provide those exact assets. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the full boundary.

Public-domain artwork status does not override jurisdiction-specific rules governing national flags, seals, or official emblems. Applications are responsible for using official symbols appropriately in their markets.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a change. Security reports should follow [SECURITY.md](SECURITY.md).
