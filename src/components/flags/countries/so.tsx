// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SomaliaFlagProps = Omit<FlagProps, "code">

export function SomaliaFlag({ alt = "Somalia flag", ...props }: SomaliaFlagProps) {
  return <Flag code="so" alt={alt} {...props} />
}
