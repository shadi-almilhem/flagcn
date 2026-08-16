// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IndiaFlagProps = Omit<FlagProps, "code">

export function IndiaFlag({ alt = "India flag", ...props }: IndiaFlagProps) {
  return <Flag code="in" alt={alt} {...props} />
}
