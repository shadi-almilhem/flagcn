// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GabonFlagProps = Omit<FlagProps, "code">

export function GabonFlag({ alt = "Gabon flag", ...props }: GabonFlagProps) {
  return <Flag code="ga" alt={alt} {...props} />
}
