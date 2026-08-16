// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FrenchPolynesiaFlagProps = Omit<FlagProps, "code">

export function FrenchPolynesiaFlag({ alt = "French Polynesia flag", ...props }: FrenchPolynesiaFlagProps) {
  return <Flag code="pf" alt={alt} {...props} />
}
