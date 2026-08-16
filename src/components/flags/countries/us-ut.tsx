// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UtahFlagProps = Omit<FlagProps, "code">

export function UtahFlag({ alt = "Utah flag", ...props }: UtahFlagProps) {
  return <Flag code="us-ut" alt={alt} {...props} />
}
