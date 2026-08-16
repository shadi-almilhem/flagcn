// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PalauFlagProps = Omit<FlagProps, "code">

export function PalauFlag({ alt = "Palau flag", ...props }: PalauFlagProps) {
  return <Flag code="pw" alt={alt} {...props} />
}
