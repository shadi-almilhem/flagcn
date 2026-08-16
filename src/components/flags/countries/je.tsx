// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type JerseyFlagProps = Omit<FlagProps, "code">

export function JerseyFlag({ alt = "Jersey flag", ...props }: JerseyFlagProps) {
  return <Flag code="je" alt={alt} {...props} />
}
