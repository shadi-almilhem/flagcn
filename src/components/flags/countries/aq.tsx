// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AntarcticaFlagProps = Omit<FlagProps, "code">

export function AntarcticaFlag({ alt = "Antarctica flag", ...props }: AntarcticaFlagProps) {
  return <Flag code="aq" alt={alt} {...props} />
}
