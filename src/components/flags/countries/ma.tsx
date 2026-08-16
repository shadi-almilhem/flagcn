// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MoroccoFlagProps = Omit<FlagProps, "code">

export function MoroccoFlag({ alt = "Morocco flag", ...props }: MoroccoFlagProps) {
  return <Flag code="ma" alt={alt} {...props} />
}
