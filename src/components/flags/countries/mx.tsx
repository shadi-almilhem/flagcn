// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MexicoFlagProps = Omit<FlagProps, "code">

export function MexicoFlag({ alt = "Mexico flag", ...props }: MexicoFlagProps) {
  return <Flag code="mx" alt={alt} {...props} />
}
