// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SyriaFlagProps = Omit<FlagProps, "code">

export function SyriaFlag({ alt = "Syria flag", ...props }: SyriaFlagProps) {
  return <Flag code="sy" alt={alt} {...props} />
}
