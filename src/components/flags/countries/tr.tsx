// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TurkeyFlagProps = Omit<FlagProps, "code">

export function TurkeyFlag({ alt = "Turkey flag", ...props }: TurkeyFlagProps) {
  return <Flag code="tr" alt={alt} {...props} />
}
