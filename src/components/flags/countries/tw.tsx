// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TaiwanFlagProps = Omit<FlagProps, "code">

export function TaiwanFlag({ alt = "Taiwan flag", ...props }: TaiwanFlagProps) {
  return <Flag code="tw" alt={alt} {...props} />
}
