// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HeardIslandAndMcdonaldIslandsFlagProps = Omit<FlagProps, "code">

export function HeardIslandAndMcdonaldIslandsFlag({ alt = "Heard Island and McDonald Islands flag", ...props }: HeardIslandAndMcdonaldIslandsFlagProps) {
  return <Flag code="hm" alt={alt} {...props} />
}
