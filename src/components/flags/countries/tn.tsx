// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TunisiaFlagProps = Omit<FlagProps, "code">

export function TunisiaFlag({ alt = "Tunisia flag", ...props }: TunisiaFlagProps) {
  return <Flag code="tn" alt={alt} {...props} />
}
