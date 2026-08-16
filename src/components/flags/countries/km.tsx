// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ComorosFlagProps = Omit<FlagProps, "code">

export function ComorosFlag({ alt = "Comoros flag", ...props }: ComorosFlagProps) {
  return <Flag code="km" alt={alt} {...props} />
}
