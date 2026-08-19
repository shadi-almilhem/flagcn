import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import { App } from "./app"

describe("App route loading", () => {
  it("renders the homepage shell without a page-level loading screen", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: "Every flag your shadcn app needs." })).toBeVisible()
    expect(screen.getByText("Source you own")).toBeVisible()
    expect(screen.queryByText("Loading page…")).not.toBeInTheDocument()
  })

  it("renders the flags-page heading while the gallery chunk loads independently", () => {
    render(
      <MemoryRouter initialEntries={["/flags"]}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: "Every flag, ready to copy." })).toBeVisible()
    expect(screen.queryByText("Loading page…")).not.toBeInTheDocument()
  })

  it("renders documentation immediately and resets scroll when the route changes", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined)
    render(
      <MemoryRouter initialEntries={["/flags"]}>
        <App />
      </MemoryRouter>,
    )
    scrollTo.mockClear()

    fireEvent.click(screen.getByRole("link", { name: "Docs" }))

    expect(screen.getByRole("heading", { name: "Introduction" })).toBeVisible()
    expect(screen.queryByLabelText("Loading documentation")).not.toBeInTheDocument()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" })
  })
})
