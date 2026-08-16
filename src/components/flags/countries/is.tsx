// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IcelandFlagProps = Omit<FlagProps, "code">

export function IcelandFlag({ alt = "Iceland flag", ...props }: IcelandFlagProps) {
  return <Flag code="is" alt={alt} {...props} />
}
