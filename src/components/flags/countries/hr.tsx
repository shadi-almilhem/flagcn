// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CroatiaFlagProps = Omit<FlagProps, "code">

export function CroatiaFlag({ alt = "Croatia flag", ...props }: CroatiaFlagProps) {
  return <Flag code="hr" alt={alt} {...props} />
}
