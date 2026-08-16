// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CaribbeanNetherlandsFlagProps = Omit<FlagProps, "code">

export function CaribbeanNetherlandsFlag({ alt = "Caribbean Netherlands flag", ...props }: CaribbeanNetherlandsFlagProps) {
  return <Flag code="bq" alt={alt} {...props} />
}
