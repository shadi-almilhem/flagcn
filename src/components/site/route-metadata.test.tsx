import { render, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"

import { RouteMetadata } from "./route-metadata"

describe("RouteMetadata", () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <meta name="description" content="">
      <meta property="og:title" content="">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <meta name="twitter:title" content="">
      <meta name="twitter:description" content="">
      <link rel="canonical" href="">
    `
  })

  it("sets unique metadata and a canonical URL for the current route", async () => {
    render(
      <MemoryRouter initialEntries={["/docs/flag"]}>
        <RouteMetadata />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(document.title).toBe("React Flag Component API and Props | Flagcn")
    })

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://flagcn.dev/docs/flag",
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://flagcn.dev/docs/flag",
    )
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("typed Flag React component"),
    )
  })
})
