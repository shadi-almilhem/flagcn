// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WestVirginiaFlagProps = Omit<FlagProps, "code">

export function WestVirginiaFlag({ alt = "West Virginia flag", ...props }: WestVirginiaFlagProps) {
  return <Flag code="us-wv" alt={alt} {...props} />
}
