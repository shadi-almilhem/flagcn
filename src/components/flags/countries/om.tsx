// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type OmanFlagProps = Omit<FlagProps, "code">

export function OmanFlag({ alt = "Oman flag", ...props }: OmanFlagProps) {
  return <Flag code="om" alt={alt} {...props} />
}
