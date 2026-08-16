// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ColoradoFlagProps = Omit<FlagProps, "code">

export function ColoradoFlag({ alt = "Colorado flag", ...props }: ColoradoFlagProps) {
  return <Flag code="us-co" alt={alt} {...props} />
}
