// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VirginiaFlagProps = Omit<FlagProps, "code">

export function VirginiaFlag({ alt = "Virginia flag", ...props }: VirginiaFlagProps) {
  return <Flag code="us-va" alt={alt} {...props} />
}
