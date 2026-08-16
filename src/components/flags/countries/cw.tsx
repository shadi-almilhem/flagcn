// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CuracaoFlagProps = Omit<FlagProps, "code">

export function CuracaoFlag({ alt = "Curaçao flag", ...props }: CuracaoFlagProps) {
  return <Flag code="cw" alt={alt} {...props} />
}
