// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewYorkFlagProps = Omit<FlagProps, "code">

export function NewYorkFlag({ alt = "New York flag", ...props }: NewYorkFlagProps) {
  return <Flag code="us-ny" alt={alt} {...props} />
}
