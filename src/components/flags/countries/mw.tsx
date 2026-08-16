// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MalawiFlagProps = Omit<FlagProps, "code">

export function MalawiFlag({ alt = "Malawi flag", ...props }: MalawiFlagProps) {
  return <Flag code="mw" alt={alt} {...props} />
}
