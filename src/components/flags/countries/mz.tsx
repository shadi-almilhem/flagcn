// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MozambiqueFlagProps = Omit<FlagProps, "code">

export function MozambiqueFlag({ alt = "Mozambique flag", ...props }: MozambiqueFlagProps) {
  return <Flag code="mz" alt={alt} {...props} />
}
