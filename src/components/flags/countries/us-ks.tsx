// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KansasFlagProps = Omit<FlagProps, "code">

export function KansasFlag({ alt = "Kansas flag", ...props }: KansasFlagProps) {
  return <Flag code="us-ks" alt={alt} {...props} />
}
