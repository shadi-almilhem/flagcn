// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MongoliaFlagProps = Omit<FlagProps, "code">

export function MongoliaFlag({ alt = "Mongolia flag", ...props }: MongoliaFlagProps) {
  return <Flag code="mn" alt={alt} {...props} />
}
