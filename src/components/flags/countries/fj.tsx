// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FijiFlagProps = Omit<FlagProps, "code">

export function FijiFlag({ alt = "Fiji flag", ...props }: FijiFlagProps) {
  return <Flag code="fj" alt={alt} {...props} />
}
