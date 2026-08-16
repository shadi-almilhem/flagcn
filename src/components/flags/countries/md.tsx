// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MoldovaFlagProps = Omit<FlagProps, "code">

export function MoldovaFlag({ alt = "Moldova flag", ...props }: MoldovaFlagProps) {
  return <Flag code="md" alt={alt} {...props} />
}
