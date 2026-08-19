import { IconCode, IconChevronUp } from "@tabler/icons-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { CodeBlock } from "./code-block"

interface ComponentExampleProps {
  title: string
  description?: string
  code: string
  children: React.ReactNode
  className?: string
  previewClassName?: string
}

export function ComponentExample({
  title,
  description,
  code,
  children,
  className,
  previewClassName,
}: ComponentExampleProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn("min-w-0 max-w-full border bg-card", className)}>
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">{title}</p>
        {description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p> : null}
      </div>
      <div className={cn("grid min-h-28 min-w-0 max-w-full place-items-center p-5", previewClassName)}>
        <React.Suspense fallback={<Skeleton className="h-9 w-full max-w-md" />}>
          {children}
        </React.Suspense>
      </div>
      <CollapsibleContent>
        <CodeBlock code={code} className="border-x-0 border-b-0" />
      </CollapsibleContent>
      <div className="relative flex justify-center border-t border-border/60 bg-card px-4 py-2">
        {!open ? <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full h-8 bg-linear-to-t from-card via-card/80 to-transparent" /> : null}
        <CollapsibleTrigger render={
          <Button variant="ghost" size="sm" aria-label={open ? `Hide code for ${title}` : `View code for ${title}`}>
            {open ? <IconChevronUp data-icon="inline-start" /> : <IconCode data-icon="inline-start" />}
            {open ? "Hide Code" : "View Code"}
          </Button>
        } />
      </div>
    </Collapsible>
  )
}
