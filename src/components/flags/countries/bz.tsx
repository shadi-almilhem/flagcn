// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BelizeFlagProps = Omit<FlagProps, "code">

export function BelizeFlag({ alt = "Belize flag", ...props }: BelizeFlagProps) {
  return <Flag code="bz" alt={alt} {...props} />
}
