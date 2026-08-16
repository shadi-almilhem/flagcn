// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewCaledoniaFlagProps = Omit<FlagProps, "code">

export function NewCaledoniaFlag({ alt = "New Caledonia flag", ...props }: NewCaledoniaFlagProps) {
  return <Flag code="nc" alt={alt} {...props} />
}
