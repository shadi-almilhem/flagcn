// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GibraltarFlagProps = Omit<FlagProps, "code">

export function GibraltarFlag({ alt = "Gibraltar flag", ...props }: GibraltarFlagProps) {
  return <Flag code="gi" alt={alt} {...props} />
}
