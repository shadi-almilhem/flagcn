import { flagCount } from "@/components/flags/flag-data"
import { FlagGallery } from "@/components/site/flag-gallery"
import { Badge } from "@/components/ui/badge"

export function FlagsPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b py-14 sm:py-18">
        <div className="site-container">
          <p className="eyebrow">Registry catalog</p>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Every flag. One API.</h1>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Search countries, territories, organizations, and subdivisions. Preview every supported format and ratio before you install.
              </p>
            </div>
            <Badge variant="secondary" className="h-fit px-3 py-1 font-mono">{flagCount} items</Badge>
          </div>
        </div>
      </section>
      <section className="site-container py-8 sm:py-10">
        <FlagGallery />
      </section>
    </main>
  )
}
