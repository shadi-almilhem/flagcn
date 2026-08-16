// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CzechiaFlagProps = Omit<FlagProps, "code">

export function CzechiaFlag({ alt = "Czechia flag", ...props }: CzechiaFlagProps) {
  return <Flag code="cz" alt={alt} {...props} />
}
