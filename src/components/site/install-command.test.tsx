import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { InstallCommand } from "./install-command"

describe("InstallCommand", () => {
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
})
