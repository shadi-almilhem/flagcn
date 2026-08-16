// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NepalFlagProps = Omit<FlagProps, "code">

export function NepalFlag({ alt = "Nepal flag", ...props }: NepalFlagProps) {
  return <Flag code="np" alt={alt} {...props} />
}
