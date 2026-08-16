// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CapeVerdeFlagProps = Omit<FlagProps, "code">

export function CapeVerdeFlag({ alt = "Cape Verde flag", ...props }: CapeVerdeFlagProps) {
  return <Flag code="cv" alt={alt} {...props} />
}
