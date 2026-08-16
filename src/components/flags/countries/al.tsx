// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AlbaniaFlagProps = Omit<FlagProps, "code">

export function AlbaniaFlag({ alt = "Albania flag", ...props }: AlbaniaFlagProps) {
  return <Flag code="al" alt={alt} {...props} />
}
