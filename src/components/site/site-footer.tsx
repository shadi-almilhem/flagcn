import { Link } from "react-router-dom"

import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="site-container grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <Logo />
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6">
            Source-owned React components. Flag artwork served by FlagCDN and sourced from Flagpedia.
          </p>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 text-sm sm:justify-end">
          <Link to="/docs/installation" className="hover:text-foreground">Installation</Link>
          <Link to="/docs/license" className="hover:text-foreground">License</Link>
          <a href="/llms.txt" className="hover:text-foreground">llms.txt</a>
          <a href="/r/registry.json" className="hover:text-foreground">Registry JSON</a>
          <a href="https://flagpedia.net" target="_blank" rel="noreferrer" className="hover:text-foreground">Flagpedia</a>
        </div>
      </div>
    </footer>
  )
}
