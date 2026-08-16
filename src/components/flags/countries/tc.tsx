// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TurksAndCaicosIslandsFlagProps = Omit<FlagProps, "code">

export function TurksAndCaicosIslandsFlag({ alt = "Turks and Caicos Islands flag", ...props }: TurksAndCaicosIslandsFlagProps) {
  return <Flag code="tc" alt={alt} {...props} />
}
