// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MayotteFlagProps = Omit<FlagProps, "code">

export function MayotteFlag({ alt = "Mayotte flag", ...props }: MayotteFlagProps) {
  return <Flag code="yt" alt={alt} {...props} />
}
