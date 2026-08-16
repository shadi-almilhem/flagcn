// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FloridaFlagProps = Omit<FlagProps, "code">

export function FloridaFlag({ alt = "Florida flag", ...props }: FloridaFlagProps) {
  return <Flag code="us-fl" alt={alt} {...props} />
}
