// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PolandFlagProps = Omit<FlagProps, "code">

export function PolandFlag({ alt = "Poland flag", ...props }: PolandFlagProps) {
  return <Flag code="pl" alt={alt} {...props} />
}
