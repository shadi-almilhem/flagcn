import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <main className="site-container grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-foreground">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em]">That flag is not here.</h1>
        <p className="mt-3 text-muted-foreground">The page may have moved, but the catalog is still intact.</p>
        <Link to="/flags" className={`${buttonVariants()} mt-7`}>Browse flags</Link>
      </div>
    </main>
  )
}
