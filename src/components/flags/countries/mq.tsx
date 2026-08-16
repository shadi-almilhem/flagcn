// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MartiniqueFlagProps = Omit<FlagProps, "code">

export function MartiniqueFlag({ alt = "Martinique flag", ...props }: MartiniqueFlagProps) {
  return <Flag code="mq" alt={alt} {...props} />
}
