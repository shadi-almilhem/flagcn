// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UzbekistanFlagProps = Omit<FlagProps, "code">

export function UzbekistanFlag({ alt = "Uzbekistan flag", ...props }: UzbekistanFlagProps) {
  return <Flag code="uz" alt={alt} {...props} />
}
