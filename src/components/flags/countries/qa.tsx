// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type QatarFlagProps = Omit<FlagProps, "code">

export function QatarFlag({ alt = "Qatar flag", ...props }: QatarFlagProps) {
  return <Flag code="qa" alt={alt} {...props} />
}
