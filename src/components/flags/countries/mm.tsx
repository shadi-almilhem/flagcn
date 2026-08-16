// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MyanmarFlagProps = Omit<FlagProps, "code">

export function MyanmarFlag({ alt = "Myanmar flag", ...props }: MyanmarFlagProps) {
  return <Flag code="mm" alt={alt} {...props} />
}
