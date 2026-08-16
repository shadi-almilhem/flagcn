// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BhutanFlagProps = Omit<FlagProps, "code">

export function BhutanFlag({ alt = "Bhutan flag", ...props }: BhutanFlagProps) {
  return <Flag code="bt" alt={alt} {...props} />
}
