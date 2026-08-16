// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MissouriFlagProps = Omit<FlagProps, "code">

export function MissouriFlag({ alt = "Missouri flag", ...props }: MissouriFlagProps) {
  return <Flag code="us-mo" alt={alt} {...props} />
}
