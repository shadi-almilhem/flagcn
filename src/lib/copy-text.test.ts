import { afterEach, describe, expect, it, vi } from "vitest"

import { copyTextToClipboard } from "./copy-text"

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("uses the async Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } })

    await copyTextToClipboard("install me")

    expect(writeText).toHaveBeenCalledWith("install me")
  })

  it("falls back to a temporary selection when clipboard permission is rejected", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    })
    const execCommand = vi.fn(() => true)
    Object.defineProperty(document, "execCommand", { configurable: true, value: execCommand })

    await copyTextToClipboard("fallback value")

    expect(execCommand).toHaveBeenCalledWith("copy")
    expect(document.querySelector("textarea")).not.toBeInTheDocument()
  })
})
