// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MontanaFlagProps = Omit<FlagProps, "code">

export function MontanaFlag({ alt = "Montana flag", ...props }: MontanaFlagProps) {
  return <Flag code="us-mt" alt={alt} {...props} />
}
