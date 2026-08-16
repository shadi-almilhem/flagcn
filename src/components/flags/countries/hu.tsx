// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HungaryFlagProps = Omit<FlagProps, "code">

export function HungaryFlag({ alt = "Hungary flag", ...props }: HungaryFlagProps) {
  return <Flag code="hu" alt={alt} {...props} />
}
