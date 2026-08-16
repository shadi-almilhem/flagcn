// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GeorgiaFlagProps = Omit<FlagProps, "code">

export function GeorgiaFlag({ alt = "Georgia flag", ...props }: GeorgiaFlagProps) {
  return <Flag code="ge" alt={alt} {...props} />
}
