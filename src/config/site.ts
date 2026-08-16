export const siteConfig = {
  name: "Flagcn",
  namespace: "flagcn",
  description: "Copy-owned, accessible flags for shadcn/ui.",
  svgSource: "https://flagicons.lipis.dev",
  rasterSource: "https://flagpedia.net",
  rasterApi: "https://flagcdn.com",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/shadi-almilhem/flagcn",
  creator: {
    name: "Shadi Al Milhem",
    website: "https://shadialmilhem.com",
    x: "https://x.com/shadi_m02",
    xHandle: "@shadi_m02",
  },
} as const

export const packageManagers = ["pnpm", "npm", "yarn", "bun"] as const
export type PackageManager = (typeof packageManagers)[number]

export function getSiteOrigin() {
  if (typeof window === "undefined") return "https://flagcn.dev"
  return window.location.origin
}

export function getRegistryConfig() {
  return `${getSiteOrigin()}/r/{name}.json`
}

export function getInstallCommand(name: string) {
  return getPackageInstallCommand(name, "pnpm")
}

export function getPackageInstallCommand(name: string, packageManager: PackageManager) {
  const item = `@${siteConfig.namespace}/${name}`
  const commands: Record<PackageManager, string> = {
    pnpm: `pnpm dlx shadcn@latest add ${item}`,
    npm: `npx shadcn@latest add ${item}`,
    yarn: `yarn dlx shadcn@latest add ${item}`,
    bun: `bunx --bun shadcn@latest add ${item}`,
  }

  return commands[packageManager]
}
