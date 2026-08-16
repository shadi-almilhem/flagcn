// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EuropeanUnionFlagProps = Omit<FlagProps, "code">

export function EuropeanUnionFlag({ alt = "European Union flag", ...props }: EuropeanUnionFlagProps) {
  return <Flag code="eu" alt={alt} {...props} />
}
