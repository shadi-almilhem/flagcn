// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VermontFlagProps = Omit<FlagProps, "code">

export function VermontFlag({ alt = "Vermont flag", ...props }: VermontFlagProps) {
  return <Flag code="us-vt" alt={alt} {...props} />
}
