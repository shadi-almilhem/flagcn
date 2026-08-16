// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthSudanFlagProps = Omit<FlagProps, "code">

export function SouthSudanFlag({ alt = "South Sudan flag", ...props }: SouthSudanFlagProps) {
  return <Flag code="ss" alt={alt} {...props} />
}
