// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthKoreaFlagProps = Omit<FlagProps, "code">

export function NorthKoreaFlag({ alt = "North Korea flag", ...props }: NorthKoreaFlagProps) {
  return <Flag code="kp" alt={alt} {...props} />
}
