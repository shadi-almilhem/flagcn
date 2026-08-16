// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BeninFlagProps = Omit<FlagProps, "code">

export function BeninFlag({ alt = "Benin flag", ...props }: BeninFlagProps) {
  return <Flag code="bj" alt={alt} {...props} />
}
