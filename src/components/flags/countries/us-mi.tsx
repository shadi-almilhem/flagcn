// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MichiganFlagProps = Omit<FlagProps, "code">

export function MichiganFlag({ alt = "Michigan flag", ...props }: MichiganFlagProps) {
  return <Flag code="us-mi" alt={alt} {...props} />
}
