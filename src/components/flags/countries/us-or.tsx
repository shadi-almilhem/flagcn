// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type OregonFlagProps = Omit<FlagProps, "code">

export function OregonFlag({ alt = "Oregon flag", ...props }: OregonFlagProps) {
  return <Flag code="us-or" alt={alt} {...props} />
}
