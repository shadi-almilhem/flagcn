// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GrenadaFlagProps = Omit<FlagProps, "code">

export function GrenadaFlag({ alt = "Grenada flag", ...props }: GrenadaFlagProps) {
  return <Flag code="gd" alt={alt} {...props} />
}
