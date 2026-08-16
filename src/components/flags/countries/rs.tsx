// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SerbiaFlagProps = Omit<FlagProps, "code">

export function SerbiaFlag({ alt = "Serbia flag", ...props }: SerbiaFlagProps) {
  return <Flag code="rs" alt={alt} {...props} />
}
