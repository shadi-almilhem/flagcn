// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CookIslandsFlagProps = Omit<FlagProps, "code">

export function CookIslandsFlag({ alt = "Cook Islands flag", ...props }: CookIslandsFlagProps) {
  return <Flag code="ck" alt={alt} {...props} />
}
