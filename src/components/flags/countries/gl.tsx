// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GreenlandFlagProps = Omit<FlagProps, "code">

export function GreenlandFlag({ alt = "Greenland flag", ...props }: GreenlandFlagProps) {
  return <Flag code="gl" alt={alt} {...props} />
}
