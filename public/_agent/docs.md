---
title: Flagcn documentation
description: Installation, flag, country, phone, language, currency, accessibility, and licensing guidance for the Flagcn shadcn registry.
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
- `@flagcn/country-data` installs typed ISO, native-name, emoji, calling-code, language, and currency metadata.
- `@flagcn/country-picker` and `@flagcn/phone-input` cover international forms.
- `@flagcn/language-picker` and `@flagcn/currency-picker` cover typed locale selection.
- `@flagcn/country-select`, `@flagcn/country-badge`, and `@flagcn/flag-avatar` provide smaller composed UI.
- `@flagcn/gcc` and `@flagcn/eu-collection` install current typed regional collections.
- `@flagcn/all` installs the entire catalog.

`Flag` supports `code`, `alt`, `format`, `width`, `ratio`, `decorative`, `className`, `style`, refs, and standard React image props. `PhoneInput` emits E.164 when parseable and validity metadata; label it and associate help/error content with `aria-describedby` or `aria-errormessage`. Calling-code reverse lookups return arrays because codes can be shared. Review [the complete reference](https://flagcn.dev/llms-full.txt) for exact contracts, accessibility rules, source URLs, and license details.

Documentation content renders immediately and every interactive component example has a local `View Code` control for its exact JSX. PhoneInput examples distinguish real small, default, large, preset, international, invalid, read-only, and disabled states in full-width rows. Moving between documentation routes resets scroll to the top unless the destination is an explicit section anchor.

## Discovery

- [Agent index](https://flagcn.dev/llms.txt)
- [Complete agent reference](https://flagcn.dev/llms-full.txt)
- [Registry index](https://flagcn.dev/r/registry.json)
- [OpenAPI description](https://flagcn.dev/openapi.json)
- [API catalog](https://flagcn.dev/.well-known/api-catalog)
- [Human documentation](https://flagcn.dev/docs)
