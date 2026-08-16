import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { InstallCommand } from "./install-command"

describe("InstallCommand", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it("switches package managers and renders the matching command", () => {
    render(<InstallCommand item="ae" />)

    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "pnpm dlx shadcn@latest add @flagcn/ae",
    )

    fireEvent.click(screen.getByRole("tab", { name: "npm" }))

    expect(screen.getByRole("tab", { name: "npm" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "npx shadcn@latest add @flagcn/ae",
    )
  })

  it("keeps the hero copy action icon-only after it is clicked", () => {
    render(<InstallCommand item="ae" />)

    const copyButton = screen.getByRole("button", { name: "Copy current install command" })
    fireEvent.click(copyButton)

    expect(copyButton).toHaveClass("size-7")
    expect(copyButton.querySelector(".inline-grid")).toBeNull()
  })
})
