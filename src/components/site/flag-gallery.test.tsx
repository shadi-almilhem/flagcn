import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FlagGallery } from "./flag-gallery"

describe("FlagGallery", () => {
  it("uses Flag Icons for SVG previews and offers image copying without external navigation", () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    expect(screen.getByRole("img", { name: "United Arab Emirates flag" })).toHaveAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ae.svg",
    )
    expect(screen.getByRole("button", { name: "Copy United Arab Emirates SVG image" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /source asset/i })).not.toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Filter by flag type" })).toBeInTheDocument()
  })

  it("updates the image format and frame without cropping", () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    fireEvent.click(screen.getByRole("button", { name: "JPEG" }))
    fireEvent.click(screen.getByRole("button", { name: "1:1" }))

    const image = screen.getByRole("img", { name: "United Arab Emirates flag" })
    expect(image).toHaveAttribute("data-format", "jpg")
    expect(image).toHaveAttribute("data-ratio", "1x1")
    expect(image).toHaveAttribute("src", "https://flagcdn.com/w160/ae.jpg")
    expect(image).toHaveStyle({ aspectRatio: "1 / 1", objectFit: "contain" })
    expect(screen.getByText("JPEG · 1:1")).toBeInTheDocument()
  })
})
