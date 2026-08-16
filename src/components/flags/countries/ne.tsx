// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NigerFlagProps = Omit<FlagProps, "code">

export function NigerFlag({ alt = "Niger flag", ...props }: NigerFlagProps) {
  return <Flag code="ne" alt={alt} {...props} />
}
