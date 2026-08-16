// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BelgiumFlagProps = Omit<FlagProps, "code">

export function BelgiumFlag({ alt = "Belgium flag", ...props }: BelgiumFlagProps) {
  return <Flag code="be" alt={alt} {...props} />
}
