// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BoliviaFlagProps = Omit<FlagProps, "code">

export function BoliviaFlag({ alt = "Bolivia flag", ...props }: BoliviaFlagProps) {
  return <Flag code="bo" alt={alt} {...props} />
}
