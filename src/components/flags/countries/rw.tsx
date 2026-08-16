// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type RwandaFlagProps = Omit<FlagProps, "code">

export function RwandaFlag({ alt = "Rwanda flag", ...props }: RwandaFlagProps) {
  return <Flag code="rw" alt={alt} {...props} />
}
