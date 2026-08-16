// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HondurasFlagProps = Omit<FlagProps, "code">

export function HondurasFlag({ alt = "Honduras flag", ...props }: HondurasFlagProps) {
  return <Flag code="hn" alt={alt} {...props} />
}
