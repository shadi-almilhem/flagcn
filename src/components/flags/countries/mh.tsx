// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MarshallIslandsFlagProps = Omit<FlagProps, "code">

export function MarshallIslandsFlag({ alt = "Marshall Islands flag", ...props }: MarshallIslandsFlagProps) {
  return <Flag code="mh" alt={alt} {...props} />
}
