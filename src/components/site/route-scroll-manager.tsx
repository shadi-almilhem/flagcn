import * as React from "react"
import { useLocation } from "react-router-dom"

export function RouteScrollManager() {
  const { pathname, hash } = useLocation()

  React.useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      return
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

  return null
}
