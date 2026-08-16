// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MonacoFlagProps = Omit<FlagProps, "code">

export function MonacoFlag({ alt = "Monaco flag", ...props }: MonacoFlagProps) {
  return <Flag code="mc" alt={alt} {...props} />
}
