// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VietnamFlagProps = Omit<FlagProps, "code">

export function VietnamFlag({ alt = "Vietnam flag", ...props }: VietnamFlagProps) {
  return <Flag code="vn" alt={alt} {...props} />
}
