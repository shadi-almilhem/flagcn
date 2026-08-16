// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FinlandFlagProps = Omit<FlagProps, "code">

export function FinlandFlag({ alt = "Finland flag", ...props }: FinlandFlagProps) {
  return <Flag code="fi" alt={alt} {...props} />
}
