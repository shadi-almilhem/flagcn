// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorwayFlagProps = Omit<FlagProps, "code">

export function NorwayFlag({ alt = "Norway flag", ...props }: NorwayFlagProps) {
  return <Flag code="no" alt={alt} {...props} />
}
