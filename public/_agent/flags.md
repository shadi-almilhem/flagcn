---
title: Browse 306 React flag components
description: Discover Flagcn flags by names, aliases, ISO and calling codes, currency, or language, then choose an image format and ratio.
---

# Flagcn catalog

Flagcn contains 306 individually installable countries, territories, organizations, and selected subdivisions.

## Discover items

```bash
pnpm dlx shadcn@latest list @flagcn
pnpm dlx shadcn@latest search @flagcn -q "United Arab Emirates"
pnpm dlx shadcn@latest view @flagcn/ae
```

The visual catalog also matches native names, aliases, ISO-3, calling codes, currencies, and languages for country flags. The canonical machine-readable inventory is [the registry index](https://flagcn.dev/r/registry.json). Each item is available at `https://flagcn.dev/r/{name}.json`.

## Display choices

- SVG is the default and is recommended for most interfaces.
- PNG, WebP, and JPEG include responsive source candidates.
- 4:3 is the default consistent landscape frame.
- 1:1 creates a square frame without clipping the flag.
- Original preserves the source artwork proportions.

## Catalog actions

Each card places the icon-only install-command copy action in the preview corner. Real one-pixel card boundaries use a stronger semantic token than internal dividers, and every outer edge is owned by a card rather than the grid parent across one-, two-, three-, and four-column layouts. The stronger row boundary keeps each action footer visually attached to the card above it. The preview grid is light and symmetrically centered. Each flag uses an opaque semantic muted frame so letterboxed or transparent image space does not reveal that grid, and flags do not scale on hover. The compact footer groups JSX and selected-image copy actions at the start, separates download at the end, and downloads a fetched file directly instead of opening the CDN asset in the current tab. Tooltips provide the full action names.

Browse the [visual catalog](https://flagcn.dev/flags) or read the [complete agent reference](https://flagcn.dev/llms-full.txt).
