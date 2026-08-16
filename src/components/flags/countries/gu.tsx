// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuamFlagProps = Omit<FlagProps, "code">

export function GuamFlag({ alt = "Guam flag", ...props }: GuamFlagProps) {
  return <Flag code="gu" alt={alt} {...props} />
}
