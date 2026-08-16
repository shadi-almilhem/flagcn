// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AngolaFlagProps = Omit<FlagProps, "code">

export function AngolaFlag({ alt = "Angola flag", ...props }: AngolaFlagProps) {
  return <Flag code="ao" alt={alt} {...props} />
}
