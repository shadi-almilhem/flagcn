// SPDX-License-Identifier: MIT

export const flagFormats = ["svg", "png", "webp", "jpg"] as const
export type FlagFormat = (typeof flagFormats)[number]

export const flagIconsVersion = "7.5.0" as const
export const flagIconsBaseUrl = `https://cdn.jsdelivr.net/npm/flag-icons@${flagIconsVersion}/flags`

export const flagWidths = [20, 40, 80, 160, 320, 640, 1280, 2560] as const
export type FlagWidth = (typeof flagWidths)[number]
export const flagRatios = ["4x3", "1x1", "original"] as const
export type FlagRatio = (typeof flagRatios)[number]

export interface FlagUrlOptions {
  format?: FlagFormat
  width?: FlagWidth | number
  ratio?: FlagRatio
}

export function normalizeFlagCode(code: string) {
  const normalizedCode = code.trim().toLowerCase()
  if (!/^[a-z]{2}(?:-[a-z0-9]{2,3})?$/.test(normalizedCode)) {
    throw new Error(`Invalid flag code: ${code}`)
  }
  return normalizedCode
}

export function getFlagUrl(code: string, options: FlagUrlOptions = {}) {
  const normalizedCode = normalizeFlagCode(code)
  const format = options.format ?? "svg"
  const width = options.width ?? 80
  const ratio = options.ratio ?? "4x3"
  validateFlagWidth(width)

  if (format === "svg") {
    if (ratio !== "original" && !normalizedCode.startsWith("us-")) {
      return `${flagIconsBaseUrl}/${ratio}/${normalizedCode}.svg`
    }

    return `https://flagcdn.com/${normalizedCode}.svg`
  }

  return `https://flagcdn.com/w${atLeastWidth(width, flagWidths)}/${normalizedCode}.${format}`
}

export function getFlagSrcSet(code: string, options: FlagUrlOptions = {}) {
  const format = options.format ?? "svg"
  if (format === "svg") return undefined

  const ratio = options.ratio ?? "4x3"
  const requestedWidth = options.width ?? 80
  validateFlagWidth(requestedWidth)
  const candidates = [requestedWidth, requestedWidth * 2, requestedWidth * 3]
    .map((candidate) => atLeastWidth(candidate, flagWidths))
    .filter((candidate, index, values) => values.indexOf(candidate) === index)

  return candidates
    .map((candidate) => `${getFlagUrl(code, { ...options, width: candidate, ratio })} ${candidate}w`)
    .join(", ")
}

function atLeastWidth<T extends number>(width: number, widths: readonly T[]): T {
  return widths.find((candidate) => candidate >= width) ?? widths.at(-1)!
}

function validateFlagWidth(width: number) {
  if (!Number.isFinite(width) || width <= 0) {
    throw new Error(`Flag width must be a positive finite number: ${width}`)
  }
}
