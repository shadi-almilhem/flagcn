// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CameroonFlagProps = Omit<FlagProps, "code">

export function CameroonFlag({ alt = "Cameroon flag", ...props }: CameroonFlagProps) {
  return <Flag code="cm" alt={alt} {...props} />
}
