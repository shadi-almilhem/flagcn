// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedNationsFlagProps = Omit<FlagProps, "code">

export function UnitedNationsFlag({ alt = "United Nations flag", ...props }: UnitedNationsFlagProps) {
  return <Flag code="un" alt={alt} {...props} />
}
