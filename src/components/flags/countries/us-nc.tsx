// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthCarolinaFlagProps = Omit<FlagProps, "code">

export function NorthCarolinaFlag({ alt = "North Carolina flag", ...props }: NorthCarolinaFlagProps) {
  return <Flag code="us-nc" alt={alt} {...props} />
}
