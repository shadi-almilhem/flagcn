// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SwitzerlandFlagProps = Omit<FlagProps, "code">

export function SwitzerlandFlag({ alt = "Switzerland flag", ...props }: SwitzerlandFlagProps) {
  return <Flag code="ch" alt={alt} {...props} />
}
