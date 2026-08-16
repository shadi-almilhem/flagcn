# Contributing to Flagcn

Thank you for improving the registry.

## Development workflow

1. Install dependencies with `pnpm install`.
2. Create a focused branch and make the smallest coherent change.
3. Run `pnpm check` before opening a pull request.
4. If component source or flag data changed, include the regenerated `registry.json`, country wrappers, and `public/r` payloads.
5. Explain user-visible behavior and include screenshots for documentation UI changes.

## Generated files

The files in `src/components/flags/countries` and `public/r` are generated. Update `src/components/flags/flag-data.ts`, shared component source, or `scripts/generate-registry.mjs`, then run:

```bash
pnpm registry:build
pnpm registry:check
```

## Component standards

- Keep installed output source-owned and understandable without Flagcn internals.
- Preserve keyboard behavior, visible focus, useful alternative text, and decorative-image support.
- Avoid adding runtime dependencies to the core `flag` item.
- Keep country items small; each should depend only on `@flagcn/flag`.
- Add tests for URL behavior, data classification, and interactive changes.

## Commit and pull request notes

Use a clear imperative title such as `Add responsive WebP examples`. Breaking registry changes must be called out and documented in `CHANGELOG.md`.
