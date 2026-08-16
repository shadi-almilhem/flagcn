// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaudiArabiaFlagProps = Omit<FlagProps, "code">

export function SaudiArabiaFlag({ alt = "Saudi Arabia flag", ...props }: SaudiArabiaFlagProps) {
  return <Flag code="sa" alt={alt} {...props} />
}
