// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KosovoFlagProps = Omit<FlagProps, "code">

export function KosovoFlag({ alt = "Kosovo flag", ...props }: KosovoFlagProps) {
  return <Flag code="xk" alt={alt} {...props} />
}
