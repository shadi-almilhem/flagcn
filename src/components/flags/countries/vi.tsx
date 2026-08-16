// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedStatesVirginIslandsFlagProps = Omit<FlagProps, "code">

export function UnitedStatesVirginIslandsFlag({ alt = "United States Virgin Islands flag", ...props }: UnitedStatesVirginIslandsFlagProps) {
  return <Flag code="vi" alt={alt} {...props} />
}
