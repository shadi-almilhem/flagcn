// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LebanonFlagProps = Omit<FlagProps, "code">

export function LebanonFlag({ alt = "Lebanon flag", ...props }: LebanonFlagProps) {
  return <Flag code="lb" alt={alt} {...props} />
}
