// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LibyaFlagProps = Omit<FlagProps, "code">

export function LibyaFlag({ alt = "Libya flag", ...props }: LibyaFlagProps) {
  return <Flag code="ly" alt={alt} {...props} />
}
