// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type YemenFlagProps = Omit<FlagProps, "code">

export function YemenFlag({ alt = "Yemen flag", ...props }: YemenFlagProps) {
  return <Flag code="ye" alt={alt} {...props} />
}
