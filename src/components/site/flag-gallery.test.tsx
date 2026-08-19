import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { FlagGallery } from "./flag-gallery"

describe("FlagGallery", () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined)
  let downloadedFileName = ""
  let downloadedHref = ""

  beforeEach(() => {
    writeText.mockClear()
    anchorClick.mockClear()
    downloadedFileName = ""
    downloadedHref = ""
    anchorClick.mockImplementation(function captureDownload(this: HTMLAnchorElement) {
      downloadedFileName = this.download
      downloadedHref = this.href
    })
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      blob: vi.fn().mockResolvedValue(new Blob(["flag"], { type: "image/svg+xml" })),
    }))
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:flag") })
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("uses Flag Icons for SVG previews and offers image copying without external navigation", () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    expect(screen.getByRole("img", { name: "United Arab Emirates flag" })).toHaveAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ae.svg",
    )
    expect(screen.getByRole("button", { name: "Copy United Arab Emirates SVG image" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Copy United Arab Emirates SVG image" })).toHaveTextContent("SVG")
    expect(screen.getByRole("button", { name: "Copy install command for United Arab Emirates" })).not.toHaveTextContent("Install")
    expect(screen.getByRole("button", { name: "Copy install command for United Arab Emirates" }).closest('[data-slot="card-content"]')).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "United Arab Emirates flag" })).not.toHaveClass("group-hover:scale-[1.02]")
    expect(screen.getByRole("img", { name: "United Arab Emirates flag" }).closest('[data-slot="flag-frame"]')).toHaveClass("bg-muted")
    expect(screen.getByRole("img", { name: "United Arab Emirates flag" }).closest('[data-slot="card"]')).toHaveClass("flag-gallery-card")
    expect(screen.getByRole("img", { name: "United Arab Emirates flag" }).closest('[data-slot="card"]')?.parentElement).toHaveClass("flag-gallery-grid")
    expect(screen.queryByRole("link", { name: /source asset/i })).not.toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Filter by flag type" })).toBeInTheDocument()
  })

  it("copies the install command through the tooltip trigger", async () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    fireEvent.click(screen.getByRole("button", { name: "Copy install command for United Arab Emirates" }))

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("pnpm dlx shadcn@latest add @flagcn/ae"))
  })

  it("downloads a fetched blob instead of navigating to the remote asset", async () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    fireEvent.click(screen.getByRole("button", { name: "Download United Arab Emirates SVG flag" }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ae.svg",
        { mode: "cors" },
      )
      expect(anchorClick).toHaveBeenCalledOnce()
      expect(downloadedFileName).toBe("ae-4x3.svg")
      expect(downloadedHref).toBe("blob:flag")
    })
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

  it("keeps SVG vector delivery when source proportions are selected", () => {
    render(<FlagGallery featuredCodes={["ae"]} />)

    fireEvent.click(screen.getByRole("button", { name: "Source" }))

    expect(screen.getByRole("img", { name: "United Arab Emirates flag" })).toHaveAttribute(
      "src",
      "https://flagcdn.com/ae.svg",
    )
    expect(screen.getByTitle("FlagCDN · SVG · source proportions")).toHaveTextContent("FlagCDN")
    expect(screen.getByText(/Source proportions remain vector SVG/)).toBeInTheDocument()
  })
})
