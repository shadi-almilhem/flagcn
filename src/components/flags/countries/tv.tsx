// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TuvaluFlagProps = Omit<FlagProps, "code">

export function TuvaluFlag({ alt = "Tuvalu flag", ...props }: TuvaluFlagProps) {
  return <Flag code="tv" alt={alt} {...props} />
}
