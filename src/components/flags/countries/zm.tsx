// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ZambiaFlagProps = Omit<FlagProps, "code">

export function ZambiaFlag({ alt = "Zambia flag", ...props }: ZambiaFlagProps) {
  return <Flag code="zm" alt={alt} {...props} />
}
