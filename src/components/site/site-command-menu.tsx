import { IconSearch } from "@tabler/icons-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import SiteCommandDialog from "./site-command-dialog"

export function SiteCommandMenu() {
  const [open, setOpen] = React.useState(false)

  function showCommandMenu() {
    setOpen(true)
  }

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Tooltip>
        <TooltipTrigger render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Search Flagcn"
            onClick={showCommandMenu}
          />
        }>
          <IconSearch />
        </TooltipTrigger>
        <TooltipContent>Search Flagcn · Ctrl K</TooltipContent>
      </Tooltip>

      <SiteCommandDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
