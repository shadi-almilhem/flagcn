import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ComponentExample } from "./component-example"

describe("ComponentExample", () => {
  it("reveals and hides the exact example code", () => {
    render(
      <ComponentExample title="Small phone input" code={'<PhoneInput size="sm" />'}>
        <div>Live preview</div>
      </ComponentExample>,
    )

    expect(screen.getByText("Live preview")).toBeVisible()
    expect(screen.queryByText('<PhoneInput size="sm" />')).not.toBeInTheDocument()
    expect(document.querySelector(".bg-linear-to-t")).toHaveClass("h-8", "from-card", "via-card/80", "to-transparent")

    fireEvent.click(screen.getByRole("button", { name: "View code for Small phone input" }))

    expect(screen.getByText('<PhoneInput size="sm" />')).toBeVisible()
    expect(screen.getByRole("button", { name: "Hide code for Small phone input" })).toHaveAttribute("aria-expanded", "true")

    fireEvent.click(screen.getByRole("button", { name: "Hide code for Small phone input" }))

    expect(screen.queryByText('<PhoneInput size="sm" />')).not.toBeInTheDocument()
  })
})
