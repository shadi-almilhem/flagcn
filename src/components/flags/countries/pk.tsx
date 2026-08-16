// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PakistanFlagProps = Omit<FlagProps, "code">

export function PakistanFlag({ alt = "Pakistan flag", ...props }: PakistanFlagProps) {
  return <Flag code="pk" alt={alt} {...props} />
}
