// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewZealandFlagProps = Omit<FlagProps, "code">

export function NewZealandFlag({ alt = "New Zealand flag", ...props }: NewZealandFlagProps) {
  return <Flag code="nz" alt={alt} {...props} />
}
