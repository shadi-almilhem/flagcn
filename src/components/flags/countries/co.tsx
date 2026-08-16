// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ColombiaFlagProps = Omit<FlagProps, "code">

export function ColombiaFlag({ alt = "Colombia flag", ...props }: ColombiaFlagProps) {
  return <Flag code="co" alt={alt} {...props} />
}
