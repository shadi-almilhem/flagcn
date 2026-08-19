import * as React from "react"

import { flagCount } from "@/components/flags/flag-data"
import { FlagGalleryLoading } from "@/components/site/flag-gallery-loading"
import { Badge } from "@/components/ui/badge"

const FlagGallery = React.lazy(() => import("@/components/site/flag-gallery").then((module) => ({ default: module.FlagGallery })))

export function FlagsPage() {
  return (
    <main className="min-h-screen">
      <section className="hero-grid border-b py-16 sm:py-20">
        <div className="site-container">
          <p className="eyebrow">Registry catalog</p>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Every flag, ready to copy.</h1>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Search countries, territories, organizations, and subdivisions. Compare four delivery formats and three no-crop frame options before installing the source.
              </p>
            </div>
            <Badge variant="secondary" className="h-fit px-3 py-1 font-mono">{flagCount} components</Badge>
          </div>
        </div>
      </section>
      <section className="site-container py-10 sm:py-12">
        <React.Suspense fallback={<FlagGalleryLoading count={12} />}>
          <FlagGallery />
        </React.Suspense>
      </section>
    </main>
  )
}
