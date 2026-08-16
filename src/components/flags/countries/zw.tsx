// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ZimbabweFlagProps = Omit<FlagProps, "code">

export function ZimbabweFlag({ alt = "Zimbabwe flag", ...props }: ZimbabweFlagProps) {
  return <Flag code="zw" alt={alt} {...props} />
}
