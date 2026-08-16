// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IndianaFlagProps = Omit<FlagProps, "code">

export function IndianaFlag({ alt = "Indiana flag", ...props }: IndianaFlagProps) {
  return <Flag code="us-in" alt={alt} {...props} />
}
