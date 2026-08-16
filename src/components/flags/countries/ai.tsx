// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AnguillaFlagProps = Omit<FlagProps, "code">

export function AnguillaFlag({ alt = "Anguilla flag", ...props }: AnguillaFlagProps) {
  return <Flag code="ai" alt={alt} {...props} />
}
