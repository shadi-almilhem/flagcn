// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KentuckyFlagProps = Omit<FlagProps, "code">

export function KentuckyFlag({ alt = "Kentucky flag", ...props }: KentuckyFlagProps) {
  return <Flag code="us-ky" alt={alt} {...props} />
}
