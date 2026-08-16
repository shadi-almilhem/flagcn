// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SlovakiaFlagProps = Omit<FlagProps, "code">

export function SlovakiaFlag({ alt = "Slovakia flag", ...props }: SlovakiaFlagProps) {
  return <Flag code="sk" alt={alt} {...props} />
}
