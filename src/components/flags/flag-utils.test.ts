import { describe, expect, it } from "vitest"

import { getFlagSrcSet, getFlagUrl, normalizeFlagCode } from "./flag-utils"

describe("flag URL helpers", () => {
  it("normalizes a country code", () => {
    expect(normalizeFlagCode(" AE ")).toBe("ae")
  })

  it("builds SVG URLs from the pinned Flag Icons collection", () => {
    expect(getFlagUrl("AE", { format: "svg", width: 160 })).toBe(
      "https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ae.svg",
    )
    expect(getFlagUrl("jp", { format: "svg", ratio: "1x1" })).toBe(
      "https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/1x1/jp.svg",
    )
  })

  it("keeps FlagCDN fallbacks where Flag Icons has no matching source", () => {
    expect(getFlagUrl("us-ca", { format: "svg", ratio: "4x3" })).toBe("https://flagcdn.com/us-ca.svg")
    expect(getFlagUrl("np", { format: "svg", ratio: "original" })).toBe("https://flagcdn.com/np.svg")
  })

  it("builds a responsive WebP URL", () => {
    expect(getFlagUrl("am", { format: "webp", width: 160, ratio: "original" })).toBe("https://flagcdn.com/w160/am.webp")
    expect(getFlagSrcSet("am", { format: "webp", width: 160, ratio: "original" })).toContain("w320/am.webp 320w")
  })

  it("builds an unmodified raster URL for framed presentation", () => {
    expect(getFlagUrl("sy", { format: "png", width: 80, ratio: "4x3" })).toBe("https://flagcdn.com/w80/sy.png")
  })

  it("uses unmodified WebP artwork inside a no-crop square presentation", () => {
    expect(getFlagUrl("jp", { format: "webp", width: 48, ratio: "1x1" })).toBe("https://flagcdn.com/w80/jp.webp")
    expect(getFlagSrcSet("jp", { format: "webp", width: 48, ratio: "1x1" })).toContain("w160/jp.webp 160w")
  })

  it("builds responsive JPEG URLs from FlagCDN's original-ratio widths", () => {
    expect(getFlagUrl("ae", { format: "jpg", width: 80, ratio: "4x3" })).toBe("https://flagcdn.com/w80/ae.jpg")
    expect(getFlagSrcSet("ae", { format: "jpg", width: 80, ratio: "1x1" })).toContain("w160/ae.jpg 160w")
  })

  it("rejects malformed codes before constructing a URL", () => {
    expect(() => getFlagUrl("../ae")).toThrow("Invalid flag code")
  })

  it("rejects invalid dimensions", () => {
    expect(() => getFlagUrl("ae", { width: 0 })).toThrow("positive finite number")
  })
})
