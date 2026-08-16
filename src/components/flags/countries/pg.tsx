// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PapuaNewGuineaFlagProps = Omit<FlagProps, "code">

export function PapuaNewGuineaFlag({ alt = "Papua New Guinea flag", ...props }: PapuaNewGuineaFlagProps) {
  return <Flag code="pg" alt={alt} {...props} />
}
