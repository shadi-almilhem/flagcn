// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthDakotaFlagProps = Omit<FlagProps, "code">

export function NorthDakotaFlag({ alt = "North Dakota flag", ...props }: NorthDakotaFlagProps) {
  return <Flag code="us-nd" alt={alt} {...props} />
}
