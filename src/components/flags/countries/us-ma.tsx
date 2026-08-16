// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MassachusettsFlagProps = Omit<FlagProps, "code">

export function MassachusettsFlag({ alt = "Massachusetts flag", ...props }: MassachusettsFlagProps) {
  return <Flag code="us-ma" alt={alt} {...props} />
}
