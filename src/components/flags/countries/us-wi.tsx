// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WisconsinFlagProps = Omit<FlagProps, "code">

export function WisconsinFlag({ alt = "Wisconsin flag", ...props }: WisconsinFlagProps) {
  return <Flag code="us-wi" alt={alt} {...props} />
}
