// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EritreaFlagProps = Omit<FlagProps, "code">

export function EritreaFlag({ alt = "Eritrea flag", ...props }: EritreaFlagProps) {
  return <Flag code="er" alt={alt} {...props} />
}
