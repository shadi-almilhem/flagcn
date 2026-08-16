// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TurkmenistanFlagProps = Omit<FlagProps, "code">

export function TurkmenistanFlag({ alt = "Turkmenistan flag", ...props }: TurkmenistanFlagProps) {
  return <Flag code="tm" alt={alt} {...props} />
}
