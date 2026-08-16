// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TennesseeFlagProps = Omit<FlagProps, "code">

export function TennesseeFlag({ alt = "Tennessee flag", ...props }: TennesseeFlagProps) {
  return <Flag code="us-tn" alt={alt} {...props} />
}
