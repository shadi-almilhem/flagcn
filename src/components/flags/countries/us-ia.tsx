// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IowaFlagProps = Omit<FlagProps, "code">

export function IowaFlag({ alt = "Iowa flag", ...props }: IowaFlagProps) {
  return <Flag code="us-ia" alt={alt} {...props} />
}
