// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MinnesotaFlagProps = Omit<FlagProps, "code">

export function MinnesotaFlag({ alt = "Minnesota flag", ...props }: MinnesotaFlagProps) {
  return <Flag code="us-mn" alt={alt} {...props} />
}
