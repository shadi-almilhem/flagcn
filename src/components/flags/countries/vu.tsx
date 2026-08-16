// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VanuatuFlagProps = Omit<FlagProps, "code">

export function VanuatuFlag({ alt = "Vanuatu flag", ...props }: VanuatuFlagProps) {
  return <Flag code="vu" alt={alt} {...props} />
}
