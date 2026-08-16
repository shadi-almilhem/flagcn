// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IsraelFlagProps = Omit<FlagProps, "code">

export function IsraelFlag({ alt = "Israel flag", ...props }: IsraelFlagProps) {
  return <Flag code="il" alt={alt} {...props} />
}
