// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KazakhstanFlagProps = Omit<FlagProps, "code">

export function KazakhstanFlag({ alt = "Kazakhstan flag", ...props }: KazakhstanFlagProps) {
  return <Flag code="kz" alt={alt} {...props} />
}
