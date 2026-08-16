// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IndonesiaFlagProps = Omit<FlagProps, "code">

export function IndonesiaFlag({ alt = "Indonesia flag", ...props }: IndonesiaFlagProps) {
  return <Flag code="id" alt={alt} {...props} />
}
