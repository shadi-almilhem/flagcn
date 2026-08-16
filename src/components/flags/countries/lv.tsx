// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LatviaFlagProps = Omit<FlagProps, "code">

export function LatviaFlag({ alt = "Latvia flag", ...props }: LatviaFlagProps) {
  return <Flag code="lv" alt={alt} {...props} />
}
