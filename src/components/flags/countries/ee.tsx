// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EstoniaFlagProps = Omit<FlagProps, "code">

export function EstoniaFlag({ alt = "Estonia flag", ...props }: EstoniaFlagProps) {
  return <Flag code="ee" alt={alt} {...props} />
}
