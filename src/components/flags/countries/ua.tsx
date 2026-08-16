// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type UkraineFlagProps = Omit<FlagProps, "code">

export function UkraineFlag({ alt = "Ukraine flag", ...props }: UkraineFlagProps) {
  return <Flag code="ua" alt={alt} {...props} />
}
