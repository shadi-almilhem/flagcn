// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type WallisAndFutunaFlagProps = Omit<FlagProps, "code">

export function WallisAndFutunaFlag({ alt = "Wallis and Futuna flag", ...props }: WallisAndFutunaFlagProps) {
  return <Flag code="wf" alt={alt} {...props} />
}
