// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuyanaFlagProps = Omit<FlagProps, "code">

export function GuyanaFlag({ alt = "Guyana flag", ...props }: GuyanaFlagProps) {
  return <Flag code="gy" alt={alt} {...props} />
}
