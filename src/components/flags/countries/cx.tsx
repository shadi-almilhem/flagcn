// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ChristmasIslandFlagProps = Omit<FlagProps, "code">

export function ChristmasIslandFlag({ alt = "Christmas Island flag", ...props }: ChristmasIslandFlagProps) {
  return <Flag code="cx" alt={alt} {...props} />
}
