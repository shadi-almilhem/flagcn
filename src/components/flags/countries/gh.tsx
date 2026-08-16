// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GhanaFlagProps = Omit<FlagProps, "code">

export function GhanaFlag({ alt = "Ghana flag", ...props }: GhanaFlagProps) {
  return <Flag code="gh" alt={alt} {...props} />
}
