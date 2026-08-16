// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WesternSaharaFlagProps = Omit<FlagProps, "code">

export function WesternSaharaFlag({ alt = "Western Sahara flag", ...props }: WesternSaharaFlagProps) {
  return <Flag code="eh" alt={alt} {...props} />
}
