// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ArizonaFlagProps = Omit<FlagProps, "code">

export function ArizonaFlag({ alt = "Arizona flag", ...props }: ArizonaFlagProps) {
  return <Flag code="us-az" alt={alt} {...props} />
}
