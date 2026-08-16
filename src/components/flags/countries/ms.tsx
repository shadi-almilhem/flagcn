// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MontserratFlagProps = Omit<FlagProps, "code">

export function MontserratFlag({ alt = "Montserrat flag", ...props }: MontserratFlagProps) {
  return <Flag code="ms" alt={alt} {...props} />
}
