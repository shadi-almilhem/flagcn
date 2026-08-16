// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LithuaniaFlagProps = Omit<FlagProps, "code">

export function LithuaniaFlag({ alt = "Lithuania flag", ...props }: LithuaniaFlagProps) {
  return <Flag code="lt" alt={alt} {...props} />
}
