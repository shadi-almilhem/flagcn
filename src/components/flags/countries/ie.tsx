// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IrelandFlagProps = Omit<FlagProps, "code">

export function IrelandFlag({ alt = "Ireland flag", ...props }: IrelandFlagProps) {
  return <Flag code="ie" alt={alt} {...props} />
}
