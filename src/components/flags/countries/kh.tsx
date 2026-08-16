// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CambodiaFlagProps = Omit<FlagProps, "code">

export function CambodiaFlag({ alt = "Cambodia flag", ...props }: CambodiaFlagProps) {
  return <Flag code="kh" alt={alt} {...props} />
}
