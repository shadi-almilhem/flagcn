---
title: Flagcn documentation
description: Installation, component APIs, accessibility, styling, formats, and licensing for the Flagcn shadcn registry.
---

# Flagcn documentation

Flagcn distributes accessible React flag components through the official `@flagcn` shadcn registry namespace.

## Quick start

```bash
pnpm dlx shadcn@latest add @flagcn/ae
```

```tsx
import { UnitedArabEmiratesFlag } from "@/components/flags/countries/ae"

export function Market() {
  return <UnitedArabEmiratesFlag alt="Available in the United Arab Emirates" />
}
```

## Component selection

- `@flagcn/<code>` installs one typed wrapper.
- `@flagcn/flag` installs the universal format-aware primitive.
- `@flagcn/flag-picker` installs the searchable picker and typed flag data.
- `@flagcn/all` installs the entire catalog.

`Flag` supports `code`, `alt`, `format`, `width`, `ratio`, `decorative`, `className`, `style`, refs, and standard React image props. Review [the complete reference](https://flagcn.dev/llms-full.txt) for exact contracts, accessibility rules, source URLs, and license details.

## Discovery

- [Agent index](https://flagcn.dev/llms.txt)
- [Complete agent reference](https://flagcn.dev/llms-full.txt)
- [Registry index](https://flagcn.dev/r/registry.json)
- [OpenAPI description](https://flagcn.dev/openapi.json)
- [API catalog](https://flagcn.dev/.well-known/api-catalog)
- [Human documentation](https://flagcn.dev/docs)
