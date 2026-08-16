import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Flag } from "./flag"

describe("Flag", () => {
  it("renders a meaningful SVG image", () => {
    render(<Flag code="ae" alt="United Arab Emirates flag" width={80} className="rounded-md" />)
    const image = screen.getByRole("img", { name: "United Arab Emirates flag" })
    expect(image).toHaveAttribute("src", "https://flagcdn.com/ae.svg")
    expect(image).toHaveAttribute("data-format", "svg")
    expect(image).toHaveAttribute("data-ratio", "4x3")
    expect(image).toHaveAttribute("width", "80")
    expect(image).toHaveAttribute("height", "60")
    expect(image).toHaveClass("rounded-md")
  })

  it("renders a square flag while forwarding native image props", () => {
    render(<Flag code="jp" ratio="1x1" width={48} alt="Japan" fetchPriority="high" />)
    const image = screen.getByRole("img", { name: "Japan" })
    expect(image).toHaveAttribute("width", "48")
    expect(image).toHaveAttribute("height", "48")
    expect(image).toHaveAttribute("fetchpriority", "high")
    expect(image).toHaveStyle({ aspectRatio: "1 / 1", objectFit: "contain", objectPosition: "center" })
  })

  it("preserves the complete artwork inside a consistent 4:3 SVG frame", () => {
    render(<Flag code="ch" ratio="4x3" width={80} alt="Switzerland" />)
    const image = screen.getByRole("img", { name: "Switzerland" })
    expect(image).toHaveStyle({ aspectRatio: "4 / 3", objectFit: "contain" })
  })

  it("hides decorative flags from the accessibility tree", () => {
    const { container } = render(<Flag code="am" decorative />)
    const image = container.querySelector("img")
    expect(image).toHaveAttribute("alt", "")
    expect(image).toHaveAttribute("aria-hidden", "true")
  })
})
