// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NebraskaFlagProps = Omit<FlagProps, "code">

export function NebraskaFlag({ alt = "Nebraska flag", ...props }: NebraskaFlagProps) {
  return <Flag code="us-ne" alt={alt} {...props} />
}
