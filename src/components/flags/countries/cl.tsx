// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ChileFlagProps = Omit<FlagProps, "code">

export function ChileFlag({ alt = "Chile flag", ...props }: ChileFlagProps) {
  return <Flag code="cl" alt={alt} {...props} />
}
