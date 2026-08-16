import { IconTerminal2 } from "@tabler/icons-react"

import { CopyButton } from "@/components/site/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPackageInstallCommand, packageManagers, type PackageManager } from "@/config/site"
import { cn } from "@/lib/utils"

interface InstallCommandProps {
  item?: string
  className?: string
}

export function InstallCommand({ item = "ae", className }: InstallCommandProps) {
  return (
    <Tabs defaultValue="pnpm" className={cn("flex-col gap-0 overflow-hidden rounded-xl border bg-card shadow-xs", className)}>
      <div className="flex items-center justify-between border-b px-3 sm:px-4">
        <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
          <IconTerminal2 className="size-3.5" />
          Install from registry
        </div>
        <TabsList variant="line" className="h-11 p-0">
          {packageManagers.map((packageManager) => (
            <TabsTrigger key={packageManager} value={packageManager} className="h-10 px-2.5 font-mono">
              {packageManager}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {packageManagers.map((packageManager) => {
        const command = getPackageInstallCommand(item, packageManager as PackageManager)
        return (
          <TabsContent key={packageManager} value={packageManager} className="m-0">
            <div className="flex min-h-16 items-center gap-3 px-3 sm:px-5">
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-foreground sm:text-sm">
                <span className="me-2 select-none text-primary">$</span>{command}
              </code>
              <CopyButton
                value={command}
                label="Copy"
                aria-label="Copy install command"
                className="shrink-0 [&_span]:hidden sm:[&_span]:inline"
              />
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
