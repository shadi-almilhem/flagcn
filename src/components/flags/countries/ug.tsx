// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UgandaFlagProps = Omit<FlagProps, "code">

export function UgandaFlag({ alt = "Uganda flag", ...props }: UgandaFlagProps) {
  return <Flag code="ug" alt={alt} {...props} />
}
