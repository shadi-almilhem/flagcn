// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MaldivesFlagProps = Omit<FlagProps, "code">

export function MaldivesFlag({ alt = "Maldives flag", ...props }: MaldivesFlagProps) {
  return <Flag code="mv" alt={alt} {...props} />
}
