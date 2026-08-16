// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KiribatiFlagProps = Omit<FlagProps, "code">

export function KiribatiFlag({ alt = "Kiribati flag", ...props }: KiribatiFlagProps) {
  return <Flag code="ki" alt={alt} {...props} />
}
