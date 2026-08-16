// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BarbadosFlagProps = Omit<FlagProps, "code">

export function BarbadosFlag({ alt = "Barbados flag", ...props }: BarbadosFlagProps) {
  return <Flag code="bb" alt={alt} {...props} />
}
