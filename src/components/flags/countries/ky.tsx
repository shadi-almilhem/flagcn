// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CaymanIslandsFlagProps = Omit<FlagProps, "code">

export function CaymanIslandsFlag({ alt = "Cayman Islands flag", ...props }: CaymanIslandsFlagProps) {
  return <Flag code="ky" alt={alt} {...props} />
}
