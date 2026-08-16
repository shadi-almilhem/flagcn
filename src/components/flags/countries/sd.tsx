// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SudanFlagProps = Omit<FlagProps, "code">

export function SudanFlag({ alt = "Sudan flag", ...props }: SudanFlagProps) {
  return <Flag code="sd" alt={alt} {...props} />
}
