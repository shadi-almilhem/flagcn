// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LouisianaFlagProps = Omit<FlagProps, "code">

export function LouisianaFlag({ alt = "Louisiana flag", ...props }: LouisianaFlagProps) {
  return <Flag code="us-la" alt={alt} {...props} />
}
