// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthCarolinaFlagProps = Omit<FlagProps, "code">

export function SouthCarolinaFlag({ alt = "South Carolina flag", ...props }: SouthCarolinaFlagProps) {
  return <Flag code="us-sc" alt={alt} {...props} />
}
