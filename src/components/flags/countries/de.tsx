// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GermanyFlagProps = Omit<FlagProps, "code">

export function GermanyFlag({ alt = "Germany flag", ...props }: GermanyFlagProps) {
  return <Flag code="de" alt={alt} {...props} />
}
