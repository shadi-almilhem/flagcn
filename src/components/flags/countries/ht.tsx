// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HaitiFlagProps = Omit<FlagProps, "code">

export function HaitiFlag({ alt = "Haiti flag", ...props }: HaitiFlagProps) {
  return <Flag code="ht" alt={alt} {...props} />
}
