// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type RussiaFlagProps = Omit<FlagProps, "code">

export function RussiaFlag({ alt = "Russia flag", ...props }: RussiaFlagProps) {
  return <Flag code="ru" alt={alt} {...props} />
}
