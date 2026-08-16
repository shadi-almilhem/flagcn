// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SurinameFlagProps = Omit<FlagProps, "code">

export function SurinameFlag({ alt = "Suriname flag", ...props }: SurinameFlagProps) {
  return <Flag code="sr" alt={alt} {...props} />
}
