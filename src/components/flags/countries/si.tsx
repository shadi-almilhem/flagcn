// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SloveniaFlagProps = Omit<FlagProps, "code">

export function SloveniaFlag({ alt = "Slovenia flag", ...props }: SloveniaFlagProps) {
  return <Flag code="si" alt={alt} {...props} />
}
