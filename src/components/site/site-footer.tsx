import { Link } from "react-router-dom"

import { siteConfig } from "@/config/site"

import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/20">
      <div className="site-container grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <Logo />
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6">
            Source-owned React components. SVGs from Flag Icons; raster assets from Flagpedia and FlagCDN.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Made by{" "}
            <a
              href={siteConfig.creator.website}
              target="_blank"
              rel="author me noreferrer"
              title="Visit shadialmilhem.com"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.creator.name}
            </a>
            {" · "}
            <a href={siteConfig.creator.x} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">
              {siteConfig.creator.xHandle}
            </a>
          </p>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 text-sm sm:justify-end">
          <Link to="/docs/installation" className="hover:text-foreground">Installation</Link>
          <Link to="/docs/license" className="hover:text-foreground">License</Link>
          <a href="/llms.txt" className="hover:text-foreground">llms.txt</a>
          <a href="/r/registry.json" className="hover:text-foreground">Registry JSON</a>
          <a href="https://flagicons.lipis.dev" target="_blank" rel="noreferrer" className="hover:text-foreground">Flag Icons</a>
          <a href="https://flagpedia.net" target="_blank" rel="noreferrer" className="hover:text-foreground">Flagpedia</a>
        </div>
      </div>
    </footer>
  )
}
