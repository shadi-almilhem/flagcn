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
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
      <div className="site-container flex h-14 items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "border-b border-transparent px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive && "border-primary text-foreground",
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
              className="ms-2 grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
          <span className="t-icon-swap" data-state={menuOpen ? "b" : "a"} data-icon="inline-start" aria-hidden="true">
            <span className="t-icon" data-icon="a"><IconMenu2 /></span>
            <span className="t-icon" data-icon="b"><IconX /></span>
          </span>
        </Button>
      </div>
      {menuOpen ? (
        <nav aria-label="Mobile navigation" className="site-container grid gap-1 border-t py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="border-s-2 border-transparent px-3 py-2 text-sm font-medium hover:border-primary hover:bg-accent">
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
