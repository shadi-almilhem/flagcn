// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorfolkIslandFlagProps = Omit<FlagProps, "code">

export function NorfolkIslandFlag({ alt = "Norfolk Island flag", ...props }: NorfolkIslandFlagProps) {
  return <Flag code="nf" alt={alt} {...props} />
}
