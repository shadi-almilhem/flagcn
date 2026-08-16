// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type RomaniaFlagProps = Omit<FlagProps, "code">

export function RomaniaFlag({ alt = "Romania flag", ...props }: RomaniaFlagProps) {
  return <Flag code="ro" alt={alt} {...props} />
}
