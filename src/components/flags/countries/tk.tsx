// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TokelauFlagProps = Omit<FlagProps, "code">

export function TokelauFlag({ alt = "Tokelau flag", ...props }: TokelauFlagProps) {
  return <Flag code="tk" alt={alt} {...props} />
}
