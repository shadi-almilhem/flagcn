// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BouvetIslandFlagProps = Omit<FlagProps, "code">

export function BouvetIslandFlag({ alt = "Bouvet Island flag", ...props }: BouvetIslandFlagProps) {
  return <Flag code="bv" alt={alt} {...props} />
}
