// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DelawareFlagProps = Omit<FlagProps, "code">

export function DelawareFlag({ alt = "Delaware flag", ...props }: DelawareFlagProps) {
  return <Flag code="us-de" alt={alt} {...props} />
}
