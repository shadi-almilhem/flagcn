// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintPierreAndMiquelonFlagProps = Omit<FlagProps, "code">

export function SaintPierreAndMiquelonFlag({ alt = "Saint Pierre and Miquelon flag", ...props }: SaintPierreAndMiquelonFlagProps) {
  return <Flag code="pm" alt={alt} {...props} />
}
