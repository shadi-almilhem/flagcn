// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MicronesiaFlagProps = Omit<FlagProps, "code">

export function MicronesiaFlag({ alt = "Micronesia flag", ...props }: MicronesiaFlagProps) {
  return <Flag code="fm" alt={alt} {...props} />
}
