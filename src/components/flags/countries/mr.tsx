// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MauritaniaFlagProps = Omit<FlagProps, "code">

export function MauritaniaFlag({ alt = "Mauritania flag", ...props }: MauritaniaFlagProps) {
  return <Flag code="mr" alt={alt} {...props} />
}
