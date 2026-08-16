// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KenyaFlagProps = Omit<FlagProps, "code">

export function KenyaFlag({ alt = "Kenya flag", ...props }: KenyaFlagProps) {
  return <Flag code="ke" alt={alt} {...props} />
}
