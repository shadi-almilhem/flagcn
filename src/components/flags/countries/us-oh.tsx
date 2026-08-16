// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type OhioFlagProps = Omit<FlagProps, "code">

export function OhioFlag({ alt = "Ohio flag", ...props }: OhioFlagProps) {
  return <Flag code="us-oh" alt={alt} {...props} />
}
