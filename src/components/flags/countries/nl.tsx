// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NetherlandsFlagProps = Omit<FlagProps, "code">

export function NetherlandsFlag({ alt = "Netherlands flag", ...props }: NetherlandsFlagProps) {
  return <Flag code="nl" alt={alt} {...props} />
}
