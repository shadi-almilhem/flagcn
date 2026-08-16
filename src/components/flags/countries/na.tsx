// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NamibiaFlagProps = Omit<FlagProps, "code">

export function NamibiaFlag({ alt = "Namibia flag", ...props }: NamibiaFlagProps) {
  return <Flag code="na" alt={alt} {...props} />
}
