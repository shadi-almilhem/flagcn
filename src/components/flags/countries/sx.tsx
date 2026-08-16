// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SintMaartenFlagProps = Omit<FlagProps, "code">

export function SintMaartenFlag({ alt = "Sint Maarten flag", ...props }: SintMaartenFlagProps) {
  return <Flag code="sx" alt={alt} {...props} />
}
