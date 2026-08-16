// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ScotlandFlagProps = Omit<FlagProps, "code">

export function ScotlandFlag({ alt = "Scotland flag", ...props }: ScotlandFlagProps) {
  return <Flag code="gb-sct" alt={alt} {...props} />
}
