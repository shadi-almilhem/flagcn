// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DominicaFlagProps = Omit<FlagProps, "code">

export function DominicaFlag({ alt = "Dominica flag", ...props }: DominicaFlagProps) {
  return <Flag code="dm" alt={alt} {...props} />
}
