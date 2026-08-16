// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FalklandIslandsFlagProps = Omit<FlagProps, "code">

export function FalklandIslandsFlag({ alt = "Falkland Islands flag", ...props }: FalklandIslandsFlagProps) {
  return <Flag code="fk" alt={alt} {...props} />
}
