// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PeruFlagProps = Omit<FlagProps, "code">

export function PeruFlag({ alt = "Peru flag", ...props }: PeruFlagProps) {
  return <Flag code="pe" alt={alt} {...props} />
}
