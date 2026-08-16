// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ParaguayFlagProps = Omit<FlagProps, "code">

export function ParaguayFlag({ alt = "Paraguay flag", ...props }: ParaguayFlagProps) {
  return <Flag code="py" alt={alt} {...props} />
}
