// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PuertoRicoFlagProps = Omit<FlagProps, "code">

export function PuertoRicoFlag({ alt = "Puerto Rico flag", ...props }: PuertoRicoFlagProps) {
  return <Flag code="pr" alt={alt} {...props} />
}
