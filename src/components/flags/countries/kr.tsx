// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthKoreaFlagProps = Omit<FlagProps, "code">

export function SouthKoreaFlag({ alt = "South Korea flag", ...props }: SouthKoreaFlagProps) {
  return <Flag code="kr" alt={alt} {...props} />
}
