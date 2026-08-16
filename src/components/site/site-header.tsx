import { IconBrandGithub, IconMenu2, IconX } from "@tabler/icons-react"
import * as React from "react"
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

const navItems = [
  { to: "/flags", label: "Flags" },
  { to: "/docs", label: "Docs" },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="bg-background/88 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="site-container flex h-14 items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive && "bg-accent text-foreground",
              )}
            >
              {item.label}
            </NavLink>
          ))}
          {siteConfig.github ? (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="text-muted-foreground hover:text-foreground ms-2 grid size-8 place-items-center rounded-md hover:bg-accent"
            >
              <IconBrandGithub className="size-4" />
            </a>
          ) : null}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconX /> : <IconMenu2 />}
        </Button>
      </div>
      {menuOpen ? (
        <nav aria-label="Mobile navigation" className="site-container grid gap-1 border-t py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
