// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PennsylvaniaFlagProps = Omit<FlagProps, "code">

export function PennsylvaniaFlag({ alt = "Pennsylvania flag", ...props }: PennsylvaniaFlagProps) {
  return <Flag code="us-pa" alt={alt} {...props} />
}
