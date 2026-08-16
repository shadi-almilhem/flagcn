// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MadagascarFlagProps = Omit<FlagProps, "code">

export function MadagascarFlag({ alt = "Madagascar flag", ...props }: MadagascarFlagProps) {
  return <Flag code="mg" alt={alt} {...props} />
}
