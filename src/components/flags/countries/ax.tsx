// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AlandIslandsFlagProps = Omit<FlagProps, "code">

export function AlandIslandsFlag({ alt = "Åland Islands flag", ...props }: AlandIslandsFlagProps) {
  return <Flag code="ax" alt={alt} {...props} />
}
