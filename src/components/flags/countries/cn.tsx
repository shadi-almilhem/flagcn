// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ChinaFlagProps = Omit<FlagProps, "code">

export function ChinaFlag({ alt = "China flag", ...props }: ChinaFlagProps) {
  return <Flag code="cn" alt={alt} {...props} />
}
