// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TajikistanFlagProps = Omit<FlagProps, "code">

export function TajikistanFlag({ alt = "Tajikistan flag", ...props }: TajikistanFlagProps) {
  return <Flag code="tj" alt={alt} {...props} />
}
