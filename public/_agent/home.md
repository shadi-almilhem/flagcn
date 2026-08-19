---
title: Flagcn: accessible flag components for shadcn/ui
description: Install 306 source-owned React flags plus country, phone, language, and currency components with the shadcn CLI.
---

# Flagcn

Flagcn is the official `@flagcn` community registry for 306 accessible React flags and international form components. The shadcn CLI copies editable source into the consuming project; there is no Flagcn runtime package.

## Install

```bash
pnpm dlx shadcn@latest add @flagcn/ae
pnpm dlx shadcn@latest add @flagcn/flag
pnpm dlx shadcn@latest add @flagcn/flag-picker
pnpm dlx shadcn@latest add @flagcn/country-picker
pnpm dlx shadcn@latest add @flagcn/phone-input
pnpm dlx shadcn@latest add @flagcn/all
```

Use `@flagcn/<code>` for a fixed flag, `@flagcn/flag` for dynamic codes, `@flagcn/country-picker` for country selection, focused locale items for forms, and `@flagcn/all` only when the complete typed catalog is required.

## Capabilities

- Formats: SVG, PNG, WebP, and JPEG.
- Ratios: 4:3, 1:1, and original.
- Styling: `className`, `style`, refs, and standard React image props.
- Accessibility: contextual alternative text, decorative mode, and a keyboard-ready picker.
- Countries: typed metadata, native names, aliases, emoji, calling-code helpers, CountrySelect, CountryBadge, and FlagAvatar.
- Forms: E.164-aware PhoneInput, LanguagePicker with RTL metadata, and CurrencyPicker with native symbols.
- Collections: current GCC and EU member code arrays.
- Rights: MIT-licensed Flagcn source and Flag Icons SVG artwork; documented public-domain Flagpedia artwork for raster assets and fallbacks.
- Site delivery: the page shell and documentation render immediately, while galleries and native flag images load progressively without a full-page loading screen.
- Site navigation: use the header search or `Ctrl+K` / `Cmd+K` to search routes and components; mobile navigation opens as an accessible labeled sheet.

## Machine-readable resources

- [Complete agent reference](https://flagcn.dev/llms-full.txt)
- [Agent instructions](https://flagcn.dev/AGENTS.md)
- [Registry index](https://flagcn.dev/r/registry.json)
- [OpenAPI description](https://flagcn.dev/openapi.json)
- [API catalog](https://flagcn.dev/.well-known/api-catalog)
- [Human documentation](https://flagcn.dev/docs)
- [Flag catalog](https://flagcn.dev/flags)
