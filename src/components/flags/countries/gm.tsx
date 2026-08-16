// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GambiaFlagProps = Omit<FlagProps, "code">

export function GambiaFlag({ alt = "Gambia flag", ...props }: GambiaFlagProps) {
  return <Flag code="gm" alt={alt} {...props} />
}
