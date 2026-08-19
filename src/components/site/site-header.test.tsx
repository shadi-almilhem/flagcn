import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { SiteHeader } from "./site-header"

describe("SiteHeader", () => {
  it("keeps the GitHub action outside the desktop-only navigation", () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    const github = screen.getByRole("link", { name: "GitHub repository" })
    expect(github).not.toHaveClass("hidden")
    expect(github.closest("nav")).toBeNull()
  })

  it("opens an accessible mobile navigation sheet", () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)

    const trigger = screen.getByRole("button", { name: "Open navigation menu" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeVisible()
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible()
  })

  it("opens the command menu from Ctrl+K", async () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)

    fireEvent.keyDown(window, { key: "k", ctrlKey: true })

    expect(await screen.findByRole("dialog", { name: "Search Flagcn" })).toBeVisible()
    expect(screen.getByPlaceholderText("Search flags, components, and docs…")).toHaveFocus()
  })
})
