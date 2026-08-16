// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedStatesMinorOutlyingIslandsFlagProps = Omit<FlagProps, "code">

export function UnitedStatesMinorOutlyingIslandsFlag({ alt = "United States Minor Outlying Islands flag", ...props }: UnitedStatesMinorOutlyingIslandsFlagProps) {
  return <Flag code="um" alt={alt} {...props} />
}
