// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BrazilFlagProps = Omit<FlagProps, "code">

export function BrazilFlag({ alt = "Brazil flag", ...props }: BrazilFlagProps) {
  return <Flag code="br" alt={alt} {...props} />
}
