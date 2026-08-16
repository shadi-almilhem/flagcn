// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BelarusFlagProps = Omit<FlagProps, "code">

export function BelarusFlag({ alt = "Belarus flag", ...props }: BelarusFlagProps) {
  return <Flag code="by" alt={alt} {...props} />
}
