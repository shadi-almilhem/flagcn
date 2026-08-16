// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuineaFlagProps = Omit<FlagProps, "code">

export function GuineaFlag({ alt = "Guinea flag", ...props }: GuineaFlagProps) {
  return <Flag code="gn" alt={alt} {...props} />
}
