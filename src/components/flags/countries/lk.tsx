// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SriLankaFlagProps = Omit<FlagProps, "code">

export function SriLankaFlag({ alt = "Sri Lanka flag", ...props }: SriLankaFlagProps) {
  return <Flag code="lk" alt={alt} {...props} />
}
