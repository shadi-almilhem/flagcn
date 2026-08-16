// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type RhodeIslandFlagProps = Omit<FlagProps, "code">

export function RhodeIslandFlag({ alt = "Rhode Island flag", ...props }: RhodeIslandFlagProps) {
  return <Flag code="us-ri" alt={alt} {...props} />
}
