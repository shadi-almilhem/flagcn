// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewHampshireFlagProps = Omit<FlagProps, "code">

export function NewHampshireFlag({ alt = "New Hampshire flag", ...props }: NewHampshireFlagProps) {
  return <Flag code="us-nh" alt={alt} {...props} />
}
