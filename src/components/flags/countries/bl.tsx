// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintBarthelemyFlagProps = Omit<FlagProps, "code">

export function SaintBarthelemyFlag({ alt = "Saint Barthélemy flag", ...props }: SaintBarthelemyFlagProps) {
  return <Flag code="bl" alt={alt} {...props} />
}
