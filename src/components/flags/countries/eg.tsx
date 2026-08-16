// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EgyptFlagProps = Omit<FlagProps, "code">

export function EgyptFlag({ alt = "Egypt flag", ...props }: EgyptFlagProps) {
  return <Flag code="eg" alt={alt} {...props} />
}
