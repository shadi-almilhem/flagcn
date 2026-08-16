import * as React from "react"
import { useLocation } from "react-router-dom"

import routeSeo from "@/config/seo-routes.json"

const siteOrigin = "https://flagcn.dev"

type SeoEntry = {
  title: string
  description: string
}

const fallbackSeo = routeSeo["/"] satisfies SeoEntry

export function RouteMetadata() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/$/, "")
    const seo = (routeSeo as Record<string, SeoEntry>)[normalizedPath] ?? fallbackSeo
    const canonicalUrl = new URL(normalizedPath, siteOrigin).toString()

    document.title = seo.title
    setMeta('meta[name="description"]', "content", seo.description)
    setMeta('meta[property="og:title"]', "content", seo.title)
    setMeta('meta[property="og:description"]', "content", seo.description)
    setMeta('meta[property="og:url"]', "content", canonicalUrl)
    setMeta('meta[name="twitter:title"]', "content", seo.title)
    setMeta('meta[name="twitter:description"]', "content", seo.description)
    setMeta('link[rel="canonical"]', "href", canonicalUrl)
  }, [pathname])

  return null
}

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  document.querySelector<HTMLElement>(selector)?.setAttribute(attribute, value)
}
