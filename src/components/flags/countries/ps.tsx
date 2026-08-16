// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PalestineFlagProps = Omit<FlagProps, "code">

export function PalestineFlag({ alt = "Palestine flag", ...props }: PalestineFlagProps) {
  return <Flag code="ps" alt={alt} {...props} />
}
