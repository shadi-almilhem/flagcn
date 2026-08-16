// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EswatiniSwazilandFlagProps = Omit<FlagProps, "code">

export function EswatiniSwazilandFlag({ alt = "Eswatini (Swaziland) flag", ...props }: EswatiniSwazilandFlagProps) {
  return <Flag code="sz" alt={alt} {...props} />
}
