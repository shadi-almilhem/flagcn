// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BangladeshFlagProps = Omit<FlagProps, "code">

export function BangladeshFlag({ alt = "Bangladesh flag", ...props }: BangladeshFlagProps) {
  return <Flag code="bd" alt={alt} {...props} />
}
