// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MontenegroFlagProps = Omit<FlagProps, "code">

export function MontenegroFlag({ alt = "Montenegro flag", ...props }: MontenegroFlagProps) {
  return <Flag code="me" alt={alt} {...props} />
}
