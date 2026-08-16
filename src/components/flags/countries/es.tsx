// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SpainFlagProps = Omit<FlagProps, "code">

export function SpainFlag({ alt = "Spain flag", ...props }: SpainFlagProps) {
  return <Flag code="es" alt={alt} {...props} />
}
