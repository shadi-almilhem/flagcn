import { describe, expect, it } from "vitest"

import { getFlagSrcSet, getFlagUrl, normalizeFlagCode } from "./flag-utils"

describe("flag URL helpers", () => {
  it("normalizes a country code", () => {
    expect(normalizeFlagCode(" AE ")).toBe("ae")
  })

  it("builds the SVG URL without a raster size", () => {
    expect(getFlagUrl("AE", { format: "svg", width: 160 })).toBe("https://flagcdn.com/ae.svg")
  })

  it("builds a responsive WebP URL", () => {
    expect(getFlagUrl("am", { format: "webp", width: 160, ratio: "original" })).toBe("https://flagcdn.com/w160/am.webp")
    expect(getFlagSrcSet("am", { format: "webp", width: 160, ratio: "original" })).toContain("w320/am.webp 320w")
  })

  it("builds an exact 4:3 raster URL when FlagCDN supports the size", () => {
    expect(getFlagUrl("sy", { format: "png", width: 80, ratio: "4x3" })).toBe("https://flagcdn.com/80x60/sy.png")
  })

  it("uses the optimized icon source for a no-crop square presentation", () => {
    expect(getFlagUrl("jp", { format: "webp", width: 48, ratio: "1x1" })).toBe("https://flagcdn.com/48x36/jp.webp")
    expect(getFlagSrcSet("jp", { format: "webp", width: 48, ratio: "1x1" })).toContain("96x72/jp.webp 96w")
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
