// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BahrainFlagProps = Omit<FlagProps, "code">

export function BahrainFlag({ alt = "Bahrain flag", ...props }: BahrainFlagProps) {
  return <Flag code="bh" alt={alt} {...props} />
}
