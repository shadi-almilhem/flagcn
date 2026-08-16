// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BahamasFlagProps = Omit<FlagProps, "code">

export function BahamasFlag({ alt = "Bahamas flag", ...props }: BahamasFlagProps) {
  return <Flag code="bs" alt={alt} {...props} />
}
