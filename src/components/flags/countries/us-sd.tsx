// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthDakotaFlagProps = Omit<FlagProps, "code">

export function SouthDakotaFlag({ alt = "South Dakota flag", ...props }: SouthDakotaFlagProps) {
  return <Flag code="us-sd" alt={alt} {...props} />
}
