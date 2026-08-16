// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ThailandFlagProps = Omit<FlagProps, "code">

export function ThailandFlag({ alt = "Thailand flag", ...props }: ThailandFlagProps) {
  return <Flag code="th" alt={alt} {...props} />
}
