// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuineaBissauFlagProps = Omit<FlagProps, "code">

export function GuineaBissauFlag({ alt = "Guinea-Bissau flag", ...props }: GuineaBissauFlagProps) {
  return <Flag code="gw" alt={alt} {...props} />
}
