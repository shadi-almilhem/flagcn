// SPDX-License-Identifier: MIT

import * as React from "react"

import {
  getFlagSrcSet,
  getFlagUrl,
  type FlagFormat,
  type FlagRatio,
  type FlagWidth,
} from "./flag-utils"

export interface FlagProps
  extends Omit<React.ComponentProps<"img">, "src" | "srcSet" | "width" | "height"> {
  code: string
  format?: FlagFormat
  width?: FlagWidth | number
  ratio?: FlagRatio
  decorative?: boolean
}

export function Flag({
  code,
  format = "svg",
  width = 80,
  ratio = "4x3",
  decorative = false,
  alt,
  loading = "lazy",
  decoding = "async",
  sizes,
  className,
  style,
  ...props
}: FlagProps) {
  const src = getFlagUrl(code, { format, width, ratio })
  const srcSet = getFlagSrcSet(code, { format, width, ratio })
  const normalizedCode = code.trim().toLowerCase()
  const height = ratio === "original" ? undefined : ratio === "1x1" ? width : Math.round(width * 0.75)
  const aspectRatio = ratio === "original" ? undefined : ratio === "1x1" ? "1 / 1" : "4 / 3"

  return (
    <img
      {...props}
      data-slot="flag"
      data-code={normalizedCode}
      data-format={format}
      data-ratio={ratio}
      src={src}
      srcSet={srcSet}
      sizes={sizes ?? (srcSet ? `${width}px` : undefined)}
      width={width}
      height={height}
      alt={decorative ? "" : (alt ?? `${code.toUpperCase()} flag`)}
      aria-hidden={decorative || undefined}
      loading={loading}
      decoding={decoding}
      className={className}
      style={{
        display: "block",
        maxWidth: "100%",
        ...(aspectRatio ? {
          aspectRatio,
          objectFit: "contain" as const,
          objectPosition: "center" as const,
        } : {}),
        ...style,
      }}
    />
  )
}
