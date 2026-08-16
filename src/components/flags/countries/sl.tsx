// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SierraLeoneFlagProps = Omit<FlagProps, "code">

export function SierraLeoneFlag({ alt = "Sierra Leone flag", ...props }: SierraLeoneFlagProps) {
  return <Flag code="sl" alt={alt} {...props} />
}
