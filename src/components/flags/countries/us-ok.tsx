// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type OklahomaFlagProps = Omit<FlagProps, "code">

export function OklahomaFlag({ alt = "Oklahoma flag", ...props }: OklahomaFlagProps) {
  return <Flag code="us-ok" alt={alt} {...props} />
}
