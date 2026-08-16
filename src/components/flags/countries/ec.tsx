// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EcuadorFlagProps = Omit<FlagProps, "code">

export function EcuadorFlag({ alt = "Ecuador flag", ...props }: EcuadorFlagProps) {
  return <Flag code="ec" alt={alt} {...props} />
}
