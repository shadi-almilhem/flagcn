// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UnitedStatesFlagProps = Omit<FlagProps, "code">

export function UnitedStatesFlag({ alt = "United States flag", ...props }: UnitedStatesFlagProps) {
  return <Flag code="us" alt={alt} {...props} />
}
