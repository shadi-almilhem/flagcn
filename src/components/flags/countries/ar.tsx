// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ArgentinaFlagProps = Omit<FlagProps, "code">

export function ArgentinaFlag({ alt = "Argentina flag", ...props }: ArgentinaFlagProps) {
  return <Flag code="ar" alt={alt} {...props} />
}
