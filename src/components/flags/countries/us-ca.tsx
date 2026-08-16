// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CaliforniaFlagProps = Omit<FlagProps, "code">

export function CaliforniaFlag({ alt = "California flag", ...props }: CaliforniaFlagProps) {
  return <Flag code="us-ca" alt={alt} {...props} />
}
