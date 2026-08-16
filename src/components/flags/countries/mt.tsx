// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MaltaFlagProps = Omit<FlagProps, "code">

export function MaltaFlag({ alt = "Malta flag", ...props }: MaltaFlagProps) {
  return <Flag code="mt" alt={alt} {...props} />
}
