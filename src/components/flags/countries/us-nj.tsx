// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewJerseyFlagProps = Omit<FlagProps, "code">

export function NewJerseyFlag({ alt = "New Jersey flag", ...props }: NewJerseyFlagProps) {
  return <Flag code="us-nj" alt={alt} {...props} />
}
