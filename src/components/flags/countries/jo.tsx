// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type JordanFlagProps = Omit<FlagProps, "code">

export function JordanFlag({ alt = "Jordan flag", ...props }: JordanFlagProps) {
  return <Flag code="jo" alt={alt} {...props} />
}
