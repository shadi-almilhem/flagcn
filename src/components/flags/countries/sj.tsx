// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SvalbardAndJanMayenFlagProps = Omit<FlagProps, "code">

export function SvalbardAndJanMayenFlag({ alt = "Svalbard and Jan Mayen flag", ...props }: SvalbardAndJanMayenFlagProps) {
  return <Flag code="sj" alt={alt} {...props} />
}
