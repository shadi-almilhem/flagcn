// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WashingtonFlagProps = Omit<FlagProps, "code">

export function WashingtonFlag({ alt = "Washington flag", ...props }: WashingtonFlagProps) {
  return <Flag code="us-wa" alt={alt} {...props} />
}
