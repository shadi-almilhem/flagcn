// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MaliFlagProps = Omit<FlagProps, "code">

export function MaliFlag({ alt = "Mali flag", ...props }: MaliFlagProps) {
  return <Flag code="ml" alt={alt} {...props} />
}
