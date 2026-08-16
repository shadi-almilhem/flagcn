// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedArabEmiratesFlagProps = Omit<FlagProps, "code">

export function UnitedArabEmiratesFlag({ alt = "United Arab Emirates flag", ...props }: UnitedArabEmiratesFlagProps) {
  return <Flag code="ae" alt={alt} {...props} />
}
