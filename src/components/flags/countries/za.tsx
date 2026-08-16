// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthAfricaFlagProps = Omit<FlagProps, "code">

export function SouthAfricaFlag({ alt = "South Africa flag", ...props }: SouthAfricaFlagProps) {
  return <Flag code="za" alt={alt} {...props} />
}
