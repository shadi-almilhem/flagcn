// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BritishIndianOceanTerritoryFlagProps = Omit<FlagProps, "code">

export function BritishIndianOceanTerritoryFlag({ alt = "British Indian Ocean Territory flag", ...props }: BritishIndianOceanTerritoryFlagProps) {
  return <Flag code="io" alt={alt} {...props} />
}
