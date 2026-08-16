// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PhilippinesFlagProps = Omit<FlagProps, "code">

export function PhilippinesFlag({ alt = "Philippines flag", ...props }: PhilippinesFlagProps) {
  return <Flag code="ph" alt={alt} {...props} />
}
