// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HawaiiFlagProps = Omit<FlagProps, "code">

export function HawaiiFlag({ alt = "Hawaii flag", ...props }: HawaiiFlagProps) {
  return <Flag code="us-hi" alt={alt} {...props} />
}
