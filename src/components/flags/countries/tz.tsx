// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TanzaniaFlagProps = Omit<FlagProps, "code">

export function TanzaniaFlag({ alt = "Tanzania flag", ...props }: TanzaniaFlagProps) {
  return <Flag code="tz" alt={alt} {...props} />
}
