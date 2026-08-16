// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CubaFlagProps = Omit<FlagProps, "code">

export function CubaFlag({ alt = "Cuba flag", ...props }: CubaFlagProps) {
  return <Flag code="cu" alt={alt} {...props} />
}
