// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LesothoFlagProps = Omit<FlagProps, "code">

export function LesothoFlag({ alt = "Lesotho flag", ...props }: LesothoFlagProps) {
  return <Flag code="ls" alt={alt} {...props} />
}
