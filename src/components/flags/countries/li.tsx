// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LiechtensteinFlagProps = Omit<FlagProps, "code">

export function LiechtensteinFlag({ alt = "Liechtenstein flag", ...props }: LiechtensteinFlagProps) {
  return <Flag code="li" alt={alt} {...props} />
}
