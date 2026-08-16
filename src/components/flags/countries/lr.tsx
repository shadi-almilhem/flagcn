// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LiberiaFlagProps = Omit<FlagProps, "code">

export function LiberiaFlag({ alt = "Liberia flag", ...props }: LiberiaFlagProps) {
  return <Flag code="lr" alt={alt} {...props} />
}
