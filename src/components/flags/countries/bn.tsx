// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BruneiFlagProps = Omit<FlagProps, "code">

export function BruneiFlag({ alt = "Brunei flag", ...props }: BruneiFlagProps) {
  return <Flag code="bn" alt={alt} {...props} />
}
