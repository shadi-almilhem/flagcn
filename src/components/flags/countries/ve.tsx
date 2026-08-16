// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VenezuelaFlagProps = Omit<FlagProps, "code">

export function VenezuelaFlag({ alt = "Venezuela flag", ...props }: VenezuelaFlagProps) {
  return <Flag code="ve" alt={alt} {...props} />
}
