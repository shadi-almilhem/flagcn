// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WyomingFlagProps = Omit<FlagProps, "code">

export function WyomingFlag({ alt = "Wyoming flag", ...props }: WyomingFlagProps) {
  return <Flag code="us-wy" alt={alt} {...props} />
}
