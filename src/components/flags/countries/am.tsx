// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ArmeniaFlagProps = Omit<FlagProps, "code">

export function ArmeniaFlag({ alt = "Armenia flag", ...props }: ArmeniaFlagProps) {
  return <Flag code="am" alt={alt} {...props} />
}
