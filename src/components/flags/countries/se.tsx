// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SwedenFlagProps = Omit<FlagProps, "code">

export function SwedenFlag({ alt = "Sweden flag", ...props }: SwedenFlagProps) {
  return <Flag code="se" alt={alt} {...props} />
}
