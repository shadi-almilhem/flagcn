// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GuatemalaFlagProps = Omit<FlagProps, "code">

export function GuatemalaFlag({ alt = "Guatemala flag", ...props }: GuatemalaFlagProps) {
  return <Flag code="gt" alt={alt} {...props} />
}
