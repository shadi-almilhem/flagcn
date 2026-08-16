// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TexasFlagProps = Omit<FlagProps, "code">

export function TexasFlag({ alt = "Texas flag", ...props }: TexasFlagProps) {
  return <Flag code="us-tx" alt={alt} {...props} />
}
