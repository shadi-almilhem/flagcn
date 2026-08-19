import {
  IconBook2,
  IconBrandGithub,
  IconFlag,
  IconHome,
  IconWorld,
} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { siteConfig } from "@/config/site"

const navigationItems = [
  { label: "Home", description: "Flagcn overview", path: "/", icon: IconHome },
  { label: "Browse flags", description: "Search all 306 flags", path: "/flags", icon: IconFlag },
  { label: "Documentation", description: "Installation and component guides", path: "/docs", icon: IconBook2 },
] as const

const componentItems = [
  { label: "Flag", description: "Formats, ratios, and responsive sources", path: "/docs/flag" },
  { label: "Flag Picker", description: "Searchable country and flag selection", path: "/docs/flag-picker" },
  { label: "Country selection", description: "CountryPicker and CountrySelect", path: "/docs/country-picker" },
  { label: "Phone Input", description: "International phone entry and validation", path: "/docs/phone-input" },
  { label: "Badges and avatars", description: "CountryBadge and FlagAvatar", path: "/docs/country-display" },
  { label: "Language and currency", description: "Locale-aware searchable pickers", path: "/docs/locale-pickers" },
  { label: "Data and utilities", description: "Typed country data and calling codes", path: "/docs/data-utilities" },
] as const

interface SiteCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SiteCommandDialog({ open, onOpenChange }: SiteCommandDialogProps) {
  const navigate = useNavigate()

  function selectRoute(path: string) {
    onOpenChange(false)
    navigate(path)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Flagcn"
      description="Navigate to flags, components, and documentation."
      className="sm:max-w-lg"
    >
      <Command>
        <CommandInput placeholder="Search flags, components, and docs…" autoFocus />
        <CommandList>
          <CommandEmpty>No matching page found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.path}
                  value={`${item.label} ${item.description}`}
                  onSelect={() => selectRoute(item.path)}
                >
                  <Icon />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{item.label}</span>
                    <span className="block truncate text-muted-foreground">{item.description}</span>
                  </span>
                  {item.path === "/flags" ? <CommandShortcut>F</CommandShortcut> : null}
                </CommandItem>
              )
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Components">
            {componentItems.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.label} ${item.description}`}
                onSelect={() => selectRoute(item.path)}
              >
                <IconWorld />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{item.label}</span>
                  <span className="block truncate text-muted-foreground">{item.description}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          {siteConfig.github ? (
            <>
              <CommandSeparator />
              <CommandGroup heading="External">
                <CommandItem
                  value="GitHub repository source code"
                  onSelect={() => {
                    onOpenChange(false)
                    window.open(siteConfig.github, "_blank", "noopener,noreferrer")
                  }}
                >
                  <IconBrandGithub />
                  <span>Open GitHub repository</span>
                </CommandItem>
              </CommandGroup>
            </>
          ) : null}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
