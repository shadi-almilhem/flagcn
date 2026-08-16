// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SouthGeorgiaFlagProps = Omit<FlagProps, "code">

export function SouthGeorgiaFlag({ alt = "South Georgia flag", ...props }: SouthGeorgiaFlagProps) {
  return <Flag code="gs" alt={alt} {...props} />
}
