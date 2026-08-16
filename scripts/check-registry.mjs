import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const catalogPath = join(root, "public/r/registry.json")

if (!existsSync(catalogPath)) throw new Error("Missing public/r/registry.json. Run pnpm registry:build first.")

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"))
if (catalog.$schema !== "https://ui.shadcn.com/schema/registry.json") throw new Error("Unexpected catalog schema.")
if (catalog.name !== "flagcn") throw new Error("Unexpected registry name.")
if (catalog.items.length !== 309) throw new Error(`Expected 309 registry items, found ${catalog.items.length}.`)

const names = new Set()
for (const item of catalog.items) {
  if (names.has(item.name)) throw new Error(`Duplicate registry item: ${item.name}`)
  names.add(item.name)
  if (item.files?.some((file) => Object.hasOwn(file, "content"))) {
    throw new Error(`Catalog item ${item.name} must not contain inline file content.`)
  }

  const itemPath = join(root, "public/r", `${item.name}.json`)
  if (!existsSync(itemPath)) throw new Error(`Missing built item: ${item.name}.json`)
  const payload = JSON.parse(readFileSync(itemPath, "utf8"))
  if (payload.$schema !== "https://ui.shadcn.com/schema/registry-item.json") {
    throw new Error(`Unexpected schema in ${item.name}.json`)
  }
  if (payload.name !== item.name) throw new Error(`Name mismatch in ${item.name}.json`)
  if (!Array.isArray(payload.files) || payload.files.length === 0) throw new Error(`No files in ${item.name}.json`)
  if (payload.meta?.license !== "MIT") throw new Error(`Missing MIT metadata in ${item.name}.json`)
}

for (const required of ["flag", "flag-picker", "all", "ae", "am", "sy", "us-ca", "un"]) {
  if (!names.has(required)) throw new Error(`Required item is missing: ${required}`)
}

const all = JSON.parse(readFileSync(join(root, "public/r/all.json"), "utf8"))
if (all.files.length !== 312) throw new Error(`Expected @flagcn/all to contain 312 files, found ${all.files.length}.`)
const allTargets = new Set(all.files.map((file) => file.target))
for (const target of [
  "@components/flags/flag.tsx",
  "@components/flags/flag-picker.tsx",
  "@components/flags/countries/index.ts",
  "@components/flags/countries/ae.tsx",
  "@components/flags/countries/us-ca.tsx",
]) {
  if (!allTargets.has(target)) throw new Error(`@flagcn/all is missing ${target}.`)
}

const picker = JSON.parse(readFileSync(join(root, "public/r/flag-picker.json"), "utf8"))
if (picker.dependencies?.includes("@tabler/icons-react")) {
  throw new Error("Flag Picker must not force a specific icon library on consumers.")
}

console.log(`Validated ${catalog.items.length} built registry items.`)
