// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DrCongoFlagProps = Omit<FlagProps, "code">

export function DrCongoFlag({ alt = "DR Congo flag", ...props }: DrCongoFlagProps) {
  return <Flag code="cd" alt={alt} {...props} />
}
