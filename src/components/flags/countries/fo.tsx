// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FaroeIslandsFlagProps = Omit<FlagProps, "code">

export function FaroeIslandsFlag({ alt = "Faroe Islands flag", ...props }: FaroeIslandsFlagProps) {
  return <Flag code="fo" alt={alt} {...props} />
}
