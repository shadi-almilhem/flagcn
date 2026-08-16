// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthMacedoniaFlagProps = Omit<FlagProps, "code">

export function NorthMacedoniaFlag({ alt = "North Macedonia flag", ...props }: NorthMacedoniaFlagProps) {
  return <Flag code="mk" alt={alt} {...props} />
}
