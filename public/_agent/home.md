---
title: Flagcn: accessible flag components for shadcn/ui
description: Install 306 source-owned React flag components with the shadcn CLI.
---

# Flagcn

Flagcn is the official `@flagcn` community registry for 306 accessible React flag components. The shadcn CLI copies editable source into the consuming project; there is no Flagcn runtime package.

## Install

```bash
pnpm dlx shadcn@latest add @flagcn/ae
pnpm dlx shadcn@latest add @flagcn/flag
pnpm dlx shadcn@latest add @flagcn/flag-picker
pnpm dlx shadcn@latest add @flagcn/all
```

Use `@flagcn/<code>` for a fixed flag, `@flagcn/flag` for dynamic codes, `@flagcn/flag-picker` for selection, and `@flagcn/all` only when the complete typed catalog is required.

## Capabilities

- Formats: SVG, PNG, WebP, and JPEG.
- Ratios: 4:3, 1:1, and original.
- Styling: `className`, `style`, refs, and standard React image props.
- Accessibility: contextual alternative text, decorative mode, and a keyboard-ready picker.
- Rights: MIT-licensed Flagcn source and Flag Icons SVG artwork; documented public-domain Flagpedia artwork for raster assets and fallbacks.

## Machine-readable resources

- [Complete agent reference](https://flagcn.dev/llms-full.txt)
- [Agent instructions](https://flagcn.dev/AGENTS.md)
- [Registry index](https://flagcn.dev/r/registry.json)
- [OpenAPI description](https://flagcn.dev/openapi.json)
- [API catalog](https://flagcn.dev/.well-known/api-catalog)
- [Human documentation](https://flagcn.dev/docs)
- [Flag catalog](https://flagcn.dev/flags)
