// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CyprusFlagProps = Omit<FlagProps, "code">

export function CyprusFlag({ alt = "Cyprus flag", ...props }: CyprusFlagProps) {
  return <Flag code="cy" alt={alt} {...props} />
}
