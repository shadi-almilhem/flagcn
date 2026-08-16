// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IllinoisFlagProps = Omit<FlagProps, "code">

export function IllinoisFlag({ alt = "Illinois flag", ...props }: IllinoisFlagProps) {
  return <Flag code="us-il" alt={alt} {...props} />
}
