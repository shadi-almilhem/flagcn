// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type GeorgiaUsStateFlagProps = Omit<FlagProps, "code">

export function GeorgiaUsStateFlag({ alt = "Georgia flag", ...props }: GeorgiaUsStateFlagProps) {
  return <Flag code="us-ga" alt={alt} {...props} />
}
