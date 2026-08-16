// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BurkinaFasoFlagProps = Omit<FlagProps, "code">

export function BurkinaFasoFlag({ alt = "Burkina Faso flag", ...props }: BurkinaFasoFlagProps) {
  return <Flag code="bf" alt={alt} {...props} />
}
