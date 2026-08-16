// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type JapanFlagProps = Omit<FlagProps, "code">

export function JapanFlag({ alt = "Japan flag", ...props }: JapanFlagProps) {
  return <Flag code="jp" alt={alt} {...props} />
}
