// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintLuciaFlagProps = Omit<FlagProps, "code">

export function SaintLuciaFlag({ alt = "Saint Lucia flag", ...props }: SaintLuciaFlagProps) {
  return <Flag code="lc" alt={alt} {...props} />
}
