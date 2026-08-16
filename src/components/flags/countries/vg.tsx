// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BritishVirginIslandsFlagProps = Omit<FlagProps, "code">

export function BritishVirginIslandsFlag({ alt = "British Virgin Islands flag", ...props }: BritishVirginIslandsFlagProps) {
  return <Flag code="vg" alt={alt} {...props} />
}
