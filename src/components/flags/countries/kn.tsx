// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintKittsAndNevisFlagProps = Omit<FlagProps, "code">

export function SaintKittsAndNevisFlag({ alt = "Saint Kitts and Nevis flag", ...props }: SaintKittsAndNevisFlagProps) {
  return <Flag code="kn" alt={alt} {...props} />
}
