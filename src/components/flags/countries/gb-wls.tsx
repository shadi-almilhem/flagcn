// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WalesFlagProps = Omit<FlagProps, "code">

export function WalesFlag({ alt = "Wales flag", ...props }: WalesFlagProps) {
  return <Flag code="gb-wls" alt={alt} {...props} />
}
