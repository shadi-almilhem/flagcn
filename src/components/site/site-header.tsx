import { IconBrandGithub, IconMenu2 } from "@tabler/icons-react"
import * as React from "react"
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"
import { SiteCommandMenu } from "./site-command-menu"
import { ThemeToggle } from "./theme-toggle"

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
        <div className="flex items-center gap-1">
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
          </nav>
          {siteConfig.github ? (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="grid size-10 place-items-center text-muted-foreground outline-none transition-[color,background-color,box-shadow] hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 md:ms-1 md:size-9"
            >
              <IconBrandGithub className="size-4" />
            </a>
          ) : null}
          <SiteCommandMenu />
          <ThemeToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              />
            }>
              <IconMenu2 />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(21rem,calc(100%-2rem))]">
              <SheetHeader className="border-b pe-14">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Browse Flagcn components and documentation.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="grid gap-1 p-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "border-s-2 border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-[color,background-color,border-color] hover:border-primary hover:bg-accent hover:text-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring/50",
                      isActive && "border-primary bg-accent text-foreground",
                    )}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
