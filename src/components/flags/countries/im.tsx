// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IsleOfManFlagProps = Omit<FlagProps, "code">

export function IsleOfManFlag({ alt = "Isle of Man flag", ...props }: IsleOfManFlagProps) {
  return <Flag code="im" alt={alt} {...props} />
}
