// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NicaraguaFlagProps = Omit<FlagProps, "code">

export function NicaraguaFlag({ alt = "Nicaragua flag", ...props }: NicaraguaFlagProps) {
  return <Flag code="ni" alt={alt} {...props} />
}
