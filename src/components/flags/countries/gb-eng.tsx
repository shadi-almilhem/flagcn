// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type EnglandFlagProps = Omit<FlagProps, "code">

export function EnglandFlag({ alt = "England flag", ...props }: EnglandFlagProps) {
  return <Flag code="gb-eng" alt={alt} {...props} />
}
