// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EthiopiaFlagProps = Omit<FlagProps, "code">

export function EthiopiaFlag({ alt = "Ethiopia flag", ...props }: EthiopiaFlagProps) {
  return <Flag code="et" alt={alt} {...props} />
}
