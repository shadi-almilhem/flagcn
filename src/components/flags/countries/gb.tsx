// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedKingdomFlagProps = Omit<FlagProps, "code">

export function UnitedKingdomFlag({ alt = "United Kingdom flag", ...props }: UnitedKingdomFlagProps) {
  return <Flag code="gb" alt={alt} {...props} />
}
