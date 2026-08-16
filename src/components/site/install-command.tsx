import {
  IconBrandNpm,
  IconBrandPnpm,
  IconBrandYarn,
  IconPlus,
  IconTerminal2,
} from "@tabler/icons-react"
import * as React from "react"

import { CopyButton } from "@/components/site/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getPackageInstallCommand,
  getSiteOrigin,
  packageManagers,
  type PackageManager,
} from "@/config/site"
import { cn } from "@/lib/utils"

interface InstallCommandProps {
  item?: string
  className?: string
}

const rotatingItems = ["ae", "all", "jp", "us-ca", "flag-picker"] as const

const packageManagerIcons = {
  pnpm: IconBrandPnpm,
  npm: IconBrandNpm,
  yarn: IconBrandYarn,
  bun: IconTerminal2,
} satisfies Record<PackageManager, typeof IconTerminal2>

export function InstallCommand({ item = "ae", className }: InstallCommandProps) {
  const items = React.useMemo(() => [item, ...rotatingItems.filter((name) => name !== item)], [item])
  const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm")
  const [activeItem, setActiveItem] = React.useState(items[0])
  const PackageManagerIcon = packageManagerIcons[packageManager]

  React.useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (reducedMotion?.matches || items.length < 2) return

    const timer = window.setInterval(() => {
      setActiveItem((current) => items[(items.indexOf(current) + 1) % items.length])
    }, 1800)

    return () => window.clearInterval(timer)
  }, [items])

  const registryCommand = `${packageManagerPrefix(packageManager)} shadcn@latest registry add @flagcn=${getSiteOrigin()}/r/{name}.json`

  return (
    <div className={cn("relative overflow-hidden border bg-code text-code-foreground", className)}>
      <Tabs
        value={packageManager}
        onValueChange={(value) => setPackageManager(value as PackageManager)}
        className="flex-col gap-0"
      >
        <div className="flex min-h-10 items-center border-b border-border/60 px-2 pe-22 sm:pe-30">
          <PackageManagerIcon aria-hidden="true" className="mx-1 size-4 shrink-0 text-muted-foreground" />
          <TabsList className="h-9 bg-transparent p-0">
            {packageManagers.map((manager) => (
              <TabsTrigger
                key={manager}
                value={manager}
                className="h-7 border border-transparent px-2.5 font-mono text-[11px] data-active:border-input data-active:shadow-none"
              >
                {manager}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {packageManagers.map((manager) => (
          <TabsContent key={manager} value={manager} className="m-0">
            <pre className="overflow-x-auto px-4 py-5 text-start sm:px-5">
              <code className="block min-w-max font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="me-2 select-none text-primary">$</span>
                <span>{packageManagerPrefix(manager)} shadcn@latest add @flagcn/</span>
                <TextSwap value={activeItem} className="text-foreground" />
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>

      <CopyButton
        value={registryCommand}
        label="Add"
        copiedLabel="Added"
        idleIcon={IconPlus}
        aria-label="Copy command to add the Flagcn registry"
        title="Copy registry setup command"
        className="absolute end-10 top-1.5 h-7 border-0 px-2 text-muted-foreground hover:text-foreground sm:end-12"
      />
      <CopyButton
        value={() => getPackageInstallCommand(activeItem, packageManager)}
        label=""
        aria-label="Copy current install command"
        title="Copy install command"
        className="absolute end-1.5 top-1.5 size-7 border-0 px-0 text-muted-foreground hover:text-foreground"
      />
    </div>
  )
}

function TextSwap({ value, className }: { value: string; className?: string }) {
  const elementRef = React.useRef<HTMLSpanElement>(null)
  const [initialValue] = React.useState(value)

  React.useEffect(() => {
    const element = elementRef.current
    if (!element || element.textContent === value) return

    const duration = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur"),
    ) || 150

    element.classList.add("is-exit")
    const timer = window.setTimeout(() => {
      element.textContent = value
      element.classList.remove("is-exit")
      element.classList.add("is-enter-start")
      void element.offsetHeight
      element.classList.remove("is-enter-start")
    }, duration)

    return () => window.clearTimeout(timer)
  }, [value])

  return <span ref={elementRef} className={cn("t-text-swap", className)}>{initialValue}</span>
}

function packageManagerPrefix(packageManager: PackageManager) {
  const commands: Record<PackageManager, string> = {
    pnpm: "pnpm dlx",
    npm: "npx",
    yarn: "yarn dlx",
    bun: "bunx --bun",
  }
  return commands[packageManager]
}
