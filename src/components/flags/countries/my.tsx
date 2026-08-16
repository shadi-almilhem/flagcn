// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MalaysiaFlagProps = Omit<FlagProps, "code">

export function MalaysiaFlag({ alt = "Malaysia flag", ...props }: MalaysiaFlagProps) {
  return <Flag code="my" alt={alt} {...props} />
}
