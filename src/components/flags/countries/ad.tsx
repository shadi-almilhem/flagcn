// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AndorraFlagProps = Omit<FlagProps, "code">

export function AndorraFlag({ alt = "Andorra flag", ...props }: AndorraFlagProps) {
  return <Flag code="ad" alt={alt} {...props} />
}
