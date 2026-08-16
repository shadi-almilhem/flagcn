// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthernMarianaIslandsFlagProps = Omit<FlagProps, "code">

export function NorthernMarianaIslandsFlag({ alt = "Northern Mariana Islands flag", ...props }: NorthernMarianaIslandsFlagProps) {
  return <Flag code="mp" alt={alt} {...props} />
}
