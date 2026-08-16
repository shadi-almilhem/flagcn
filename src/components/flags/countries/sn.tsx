// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SenegalFlagProps = Omit<FlagProps, "code">

export function SenegalFlag({ alt = "Senegal flag", ...props }: SenegalFlagProps) {
  return <Flag code="sn" alt={alt} {...props} />
}
