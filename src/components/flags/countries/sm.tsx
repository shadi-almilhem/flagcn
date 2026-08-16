// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SanMarinoFlagProps = Omit<FlagProps, "code">

export function SanMarinoFlag({ alt = "San Marino flag", ...props }: SanMarinoFlagProps) {
  return <Flag code="sm" alt={alt} {...props} />
}
