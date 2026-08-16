// SPDX-License-Identifier: MIT

export const flagFormats = ["svg", "png", "webp"] as const
export type FlagFormat = (typeof flagFormats)[number]

export const flagWidths = [20, 40, 80, 160, 320, 640, 1280, 2560] as const
export type FlagWidth = (typeof flagWidths)[number]
export const flagRatios = ["4x3", "1x1", "original"] as const
export type FlagRatio = (typeof flagRatios)[number]

export const flagIconWidths = [
  16, 20, 24, 28, 32, 36, 40, 48, 56, 60, 64, 72, 80, 84, 96, 108, 112,
  120, 128, 144, 160, 192, 224, 256,
] as const

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
    return `https://flagcdn.com/${normalizedCode}.svg`
  }

  if (ratio !== "original" && width <= flagIconWidths.at(-1)!) {
    const iconWidth = closestWidth(width, flagIconWidths)
    return `https://flagcdn.com/${iconWidth}x${Math.round(iconWidth * 0.75)}/${normalizedCode}.${format}`
  }

  return `https://flagcdn.com/w${closestWidth(width, flagWidths)}/${normalizedCode}.${format}`
}

export function getFlagSrcSet(code: string, options: FlagUrlOptions = {}) {
  const format = options.format ?? "svg"
  if (format === "svg") return undefined

  const ratio = options.ratio ?? "4x3"
  const requestedWidth = options.width ?? 80
  validateFlagWidth(requestedWidth)
  const availableWidths = ratio === "original" ? flagWidths : flagIconWidths
  const candidates = [requestedWidth, requestedWidth * 2, requestedWidth * 3]
    .map((candidate) => closestWidth(candidate, availableWidths))
    .filter((candidate, index, values) => values.indexOf(candidate) === index)

  return candidates
    .map((candidate) => `${getFlagUrl(code, { ...options, width: candidate, ratio })} ${candidate}w`)
    .join(", ")
}

function closestWidth<T extends number>(width: number, widths: readonly T[]): T {
  return widths.reduce((closest, candidate) =>
    Math.abs(candidate - width) < Math.abs(closest - width) ? candidate : closest,
  )
}

function validateFlagWidth(width: number) {
  if (!Number.isFinite(width) || width <= 0) {
    throw new Error(`Flag width must be a positive finite number: ${width}`)
  }
}
