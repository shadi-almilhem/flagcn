// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LuxembourgFlagProps = Omit<FlagProps, "code">

export function LuxembourgFlag({ alt = "Luxembourg flag", ...props }: LuxembourgFlagProps) {
  return <Flag code="lu" alt={alt} {...props} />
}
