// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GreeceFlagProps = Omit<FlagProps, "code">

export function GreeceFlag({ alt = "Greece flag", ...props }: GreeceFlagProps) {
  return <Flag code="gr" alt={alt} {...props} />
}
