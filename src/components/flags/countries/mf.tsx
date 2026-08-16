// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintMartinFlagProps = Omit<FlagProps, "code">

export function SaintMartinFlag({ alt = "Saint Martin flag", ...props }: SaintMartinFlagProps) {
  return <Flag code="mf" alt={alt} {...props} />
}
