// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NevadaFlagProps = Omit<FlagProps, "code">

export function NevadaFlag({ alt = "Nevada flag", ...props }: NevadaFlagProps) {
  return <Flag code="us-nv" alt={alt} {...props} />
}
