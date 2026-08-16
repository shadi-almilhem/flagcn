// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AfghanistanFlagProps = Omit<FlagProps, "code">

export function AfghanistanFlag({ alt = "Afghanistan flag", ...props }: AfghanistanFlagProps) {
  return <Flag code="af" alt={alt} {...props} />
}
