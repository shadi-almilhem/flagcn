import { Route, Routes } from "react-router-dom"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { RouteMetadata } from "@/components/site/route-metadata"
import { RouteScrollManager } from "@/components/site/route-scroll-manager"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DocsPage } from "@/pages/docs-page"
import { HomePage } from "@/pages/home-page"
import { FlagsPage } from "@/pages/flags-page"
import { NotFoundPage } from "@/pages/not-found-page"

export function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <RouteMetadata />
        <RouteScrollManager />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flags" element={<FlagsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
