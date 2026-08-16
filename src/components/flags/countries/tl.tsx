// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TimorLesteFlagProps = Omit<FlagProps, "code">

export function TimorLesteFlag({ alt = "Timor-Leste flag", ...props }: TimorLesteFlagProps) {
  return <Flag code="tl" alt={alt} {...props} />
}
