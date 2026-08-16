// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PanamaFlagProps = Omit<FlagProps, "code">

export function PanamaFlag({ alt = "Panama flag", ...props }: PanamaFlagProps) {
  return <Flag code="pa" alt={alt} {...props} />
}
