// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuernseyFlagProps = Omit<FlagProps, "code">

export function GuernseyFlag({ alt = "Guernsey flag", ...props }: GuernseyFlagProps) {
  return <Flag code="gg" alt={alt} {...props} />
}
