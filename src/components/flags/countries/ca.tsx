// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CanadaFlagProps = Omit<FlagProps, "code">

export function CanadaFlag({ alt = "Canada flag", ...props }: CanadaFlagProps) {
  return <Flag code="ca" alt={alt} {...props} />
}
