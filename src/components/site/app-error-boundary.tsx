import * as React from "react"

import { Button } from "@/components/ui/button"

interface AppErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false }

  retry = () => {
    this.setState({ hasError: false })
  }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Flagcn failed to render", error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="site-container grid min-h-screen place-items-center py-20 text-center">
        <div className="max-w-md border bg-card p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Render error</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Flagcn hit an unexpected problem.</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Reload the page to retry. If it keeps happening, report the route and browser in GitHub Issues.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button onClick={this.retry}>Try again</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>Reload page</Button>
            <Button variant="outline" onClick={() => { window.location.href = "/" }}>Go home</Button>
          </div>
        </div>
      </main>
    )
  }
}
