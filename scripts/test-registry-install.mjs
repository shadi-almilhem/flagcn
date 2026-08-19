import { spawn } from "node:child_process"
import { createServer } from "node:http"
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { extname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)))
const PUBLIC_DIR = join(ROOT, "public")
const consumerDirs = new Set()
const externalOrigin = process.env.REGISTRY_TEST_ORIGIN?.replace(/\/$/, "")

const baseColor = {
  cssVars: { theme: {}, light: {}, dark: {} },
  cssVarsV4: { theme: {}, light: {}, dark: {} },
  inlineColors: { light: {}, dark: {} },
  inlineColorsTemplate: "",
  cssVarsTemplate: "",
}

function createConsumer(origin, label) {
  const consumerDir = mkdtempSync(join(ROOT, `.tmp-consumer-${label}-`))
  consumerDirs.add(consumerDir)
  mkdirSync(join(consumerDir, "src/lib"), { recursive: true })
  writeFileSync(join(consumerDir, "package.json"), `${JSON.stringify({
    name: `flagcn-${label}-install-test`,
    private: true,
    type: "module",
    packageManager: "pnpm@11.19.0",
  }, null, 2)}\n`)
  writeFileSync(join(consumerDir, "pnpm-workspace.yaml"), 'packages:\n  - "."\n')
  writeFileSync(join(consumerDir, "src/index.css"), '@import "tailwindcss";\n')
  writeFileSync(join(consumerDir, "src/lib/utils.ts"), "export function cn(...values: unknown[]) { return values.filter(Boolean).join(\" \") }\n")
  writeFileSync(join(consumerDir, "tsconfig.json"), `${JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      useDefineForClassFields: true,
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      allowJs: false,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: "ESNext",
      moduleResolution: "Bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      baseUrl: ".",
      paths: { "@/*": ["./src/*"] },
    },
    include: ["src"],
  }, null, 2)}\n`)
  writeFileSync(join(consumerDir, "components.json"), `${JSON.stringify({
    $schema: "https://ui.shadcn.com/schema.json",
    style: "base-lyra",
    rsc: false,
    tsx: true,
    tailwind: { config: "", css: "src/index.css", baseColor: "mist", cssVariables: true, prefix: "" },
    iconLibrary: "tabler",
    rtl: false,
    menuColor: "default",
    menuAccent: "subtle",
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    registries: { "@flagcn": { url: `${origin}/r/{name}.json` } },
  }, null, 2)}\n`)
  return consumerDir
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options })
    child.on("error", reject)
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)))
  })
}

const server = createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  if (request.url === "/r/colors/mist.json") {
    response.setHeader("Content-Type", "application/json")
    response.end(JSON.stringify(baseColor))
    return
  }

  const requestPath = normalize(request.url?.split("?")[0] || "/").replace(/^\/+/, "")
  const filePath = join(PUBLIC_DIR, requestPath)
  if (!filePath.startsWith(PUBLIC_DIR) || !existsSync(filePath)) {
    response.statusCode = 404
    response.end("Not found")
    return
  }

  response.setHeader("Content-Type", extname(filePath) === ".json" ? "application/json" : "text/plain")
  response.end(readFileSync(filePath))
})

async function verifyInstall(origin, item, expectedFiles) {
  const label = item.slice(item.lastIndexOf("/") + 1)
  const consumerDir = createConsumer(origin, label)
  const cleanEnv = { ...process.env, NODE_USE_ENV_PROXY: "0" }
  // Keep shadcn's own primitives on the official registry. @flagcn already
  // resolves through the explicit components.json URL above.
  delete cleanEnv.REGISTRY_URL
  for (const key of [
    "ALL_PROXY", "all_proxy", "HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy",
    "npm_config_proxy", "npm_config_http_proxy", "npm_config_https_proxy",
    "NPM_CONFIG_PROXY", "NPM_CONFIG_HTTP_PROXY", "NPM_CONFIG_HTTPS_PROXY",
  ]) delete cleanEnv[key]

  const shadcn = join(ROOT, "node_modules/shadcn/dist/index.js")
  const tsc = join(ROOT, "node_modules/typescript/bin/tsc")
  await run(process.execPath, [shadcn, "add", item, "-y"], { cwd: consumerDir, env: cleanEnv })
  await run(process.execPath, [tsc, "-p", join(consumerDir, "tsconfig.json"), "--noEmit"], { cwd: ROOT })

  for (const file of expectedFiles) {
    if (!existsSync(join(consumerDir, file))) throw new Error(`The CLI did not install ${file} from ${item}.`)
  }
  return consumerDir
}

try {
  let origin = externalOrigin
  if (!origin) {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
    const address = server.address()
    if (!address || typeof address === "string") throw new Error("Could not start the local registry server.")
    origin = `http://127.0.0.1:${address.port}`
  }

  await verifyInstall(origin, "@flagcn/ae", [
    "src/components/flags/flag.tsx",
    "src/components/flags/flag-utils.ts",
    "src/components/flags/countries/ae.tsx",
  ])

  await verifyInstall(origin, "@flagcn/phone-input", [
    "src/components/flags/phone-input.tsx",
    "src/components/flags/country-picker.tsx",
    "src/components/flags/country-utils.ts",
    "src/components/flags/data/countries.ts",
  ])

  await verifyInstall(origin, "@flagcn/language-picker", [
    "src/components/flags/language-picker.tsx",
    "src/components/flags/search-picker.tsx",
    "src/components/flags/data/languages.ts",
  ])

  const allConsumer = await verifyInstall(origin, "@flagcn/all", [
    "src/components/flags/flag.tsx",
    "src/components/flags/flag-picker.tsx",
    "src/components/flags/index.ts",
    "src/components/flags/countries/index.ts",
    "src/components/flags/countries/ae.tsx",
    "src/components/flags/countries/us-ca.tsx",
  ])
  const installedCountries = readdirSync(join(allConsumer, "src/components/flags/countries"))
    .filter((file) => file.endsWith(".tsx"))
  if (installedCountries.length !== 306) {
    throw new Error(`@flagcn/all installed ${installedCountries.length} country wrappers instead of 306.`)
  }

  console.log("Verified clean shadcn installs of @flagcn/ae, @flagcn/phone-input, @flagcn/language-picker, and @flagcn/all, including all 306 wrappers.")
} finally {
  if (server.listening) await new Promise((resolve) => server.close(resolve))
  for (const consumerDir of consumerDirs) rmSync(consumerDir, { recursive: true, force: true })
}
