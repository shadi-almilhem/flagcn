// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CocosKeelingIslandsFlagProps = Omit<FlagProps, "code">

export function CocosKeelingIslandsFlag({ alt = "Cocos (Keeling) Islands flag", ...props }: CocosKeelingIslandsFlagProps) {
  return <Flag code="cc" alt={alt} {...props} />
}
