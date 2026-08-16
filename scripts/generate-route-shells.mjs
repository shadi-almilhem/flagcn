import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"

const routes = [
  "flags",
  "docs",
  "docs/introduction",
  "docs/installation",
  "docs/flag",
  "docs/flag-picker",
  "docs/country-components",
  "docs/formats-and-ratios",
  "docs/styling",
  "docs/accessibility",
  "docs/ai-agents",
  "docs/publishing",
  "docs/license",
]

const outputDirectory = path.resolve("dist")
const appShell = path.join(outputDirectory, "index.html")

await Promise.all(routes.map(async (route) => {
  const routeShell = path.join(outputDirectory, `${route}.html`)
  await mkdir(path.dirname(routeShell), { recursive: true })
  await copyFile(appShell, routeShell)
}))

console.log(`Generated ${routes.length} static route shells.`)
