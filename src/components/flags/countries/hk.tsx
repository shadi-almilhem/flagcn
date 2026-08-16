// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type HongKongFlagProps = Omit<FlagProps, "code">

export function HongKongFlag({ alt = "Hong Kong flag", ...props }: HongKongFlagProps) {
  return <Flag code="hk" alt={alt} {...props} />
}
