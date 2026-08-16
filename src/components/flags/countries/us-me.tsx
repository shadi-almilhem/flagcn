// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MaineFlagProps = Omit<FlagProps, "code">

export function MaineFlag({ alt = "Maine flag", ...props }: MaineFlagProps) {
  return <Flag code="us-me" alt={alt} {...props} />
}
