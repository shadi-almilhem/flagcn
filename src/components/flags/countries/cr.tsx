// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CostaRicaFlagProps = Omit<FlagProps, "code">

export function CostaRicaFlag({ alt = "Costa Rica flag", ...props }: CostaRicaFlagProps) {
  return <Flag code="cr" alt={alt} {...props} />
}
