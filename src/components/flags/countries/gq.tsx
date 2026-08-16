// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EquatorialGuineaFlagProps = Omit<FlagProps, "code">

export function EquatorialGuineaFlag({ alt = "Equatorial Guinea flag", ...props }: EquatorialGuineaFlagProps) {
  return <Flag code="gq" alt={alt} {...props} />
}
