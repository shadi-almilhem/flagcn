// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ConnecticutFlagProps = Omit<FlagProps, "code">

export function ConnecticutFlag({ alt = "Connecticut flag", ...props }: ConnecticutFlagProps) {
  return <Flag code="us-ct" alt={alt} {...props} />
}
