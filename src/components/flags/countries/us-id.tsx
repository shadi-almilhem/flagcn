// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IdahoFlagProps = Omit<FlagProps, "code">

export function IdahoFlag({ alt = "Idaho flag", ...props }: IdahoFlagProps) {
  return <Flag code="us-id" alt={alt} {...props} />
}
