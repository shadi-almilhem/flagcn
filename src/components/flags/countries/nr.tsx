// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NauruFlagProps = Omit<FlagProps, "code">

export function NauruFlag({ alt = "Nauru flag", ...props }: NauruFlagProps) {
  return <Flag code="nr" alt={alt} {...props} />
}
