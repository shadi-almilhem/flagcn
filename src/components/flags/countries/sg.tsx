// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SingaporeFlagProps = Omit<FlagProps, "code">

export function SingaporeFlag({ alt = "Singapore flag", ...props }: SingaporeFlagProps) {
  return <Flag code="sg" alt={alt} {...props} />
}
