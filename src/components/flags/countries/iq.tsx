// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IraqFlagProps = Omit<FlagProps, "code">

export function IraqFlag({ alt = "Iraq flag", ...props }: IraqFlagProps) {
  return <Flag code="iq" alt={alt} {...props} />
}
