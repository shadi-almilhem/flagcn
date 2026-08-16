// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuadeloupeFlagProps = Omit<FlagProps, "code">

export function GuadeloupeFlag({ alt = "Guadeloupe flag", ...props }: GuadeloupeFlagProps) {
  return <Flag code="gp" alt={alt} {...props} />
}
