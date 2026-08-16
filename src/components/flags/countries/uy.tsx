// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UruguayFlagProps = Omit<FlagProps, "code">

export function UruguayFlag({ alt = "Uruguay flag", ...props }: UruguayFlagProps) {
  return <Flag code="uy" alt={alt} {...props} />
}
