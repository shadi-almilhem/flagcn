// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SolomonIslandsFlagProps = Omit<FlagProps, "code">

export function SolomonIslandsFlag({ alt = "Solomon Islands flag", ...props }: SolomonIslandsFlagProps) {
  return <Flag code="sb" alt={alt} {...props} />
}
