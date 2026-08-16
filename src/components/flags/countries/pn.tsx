// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PitcairnIslandsFlagProps = Omit<FlagProps, "code">

export function PitcairnIslandsFlag({ alt = "Pitcairn Islands flag", ...props }: PitcairnIslandsFlagProps) {
  return <Flag code="pn" alt={alt} {...props} />
}
