// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AlabamaFlagProps = Omit<FlagProps, "code">

export function AlabamaFlag({ alt = "Alabama flag", ...props }: AlabamaFlagProps) {
  return <Flag code="us-al" alt={alt} {...props} />
}
