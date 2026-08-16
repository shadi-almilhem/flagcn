// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ItalyFlagProps = Omit<FlagProps, "code">

export function ItalyFlag({ alt = "Italy flag", ...props }: ItalyFlagProps) {
  return <Flag code="it" alt={alt} {...props} />
}
