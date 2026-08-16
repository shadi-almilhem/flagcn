// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DominicanRepublicFlagProps = Omit<FlagProps, "code">

export function DominicanRepublicFlag({ alt = "Dominican Republic flag", ...props }: DominicanRepublicFlagProps) {
  return <Flag code="do" alt={alt} {...props} />
}
