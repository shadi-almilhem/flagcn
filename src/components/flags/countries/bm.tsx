// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BermudaFlagProps = Omit<FlagProps, "code">

export function BermudaFlag({ alt = "Bermuda flag", ...props }: BermudaFlagProps) {
  return <Flag code="bm" alt={alt} {...props} />
}
