// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CentralAfricanRepublicFlagProps = Omit<FlagProps, "code">

export function CentralAfricanRepublicFlag({ alt = "Central African Republic flag", ...props }: CentralAfricanRepublicFlagProps) {
  return <Flag code="cf" alt={alt} {...props} />
}
