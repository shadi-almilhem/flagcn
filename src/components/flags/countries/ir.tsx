// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type IranFlagProps = Omit<FlagProps, "code">

export function IranFlag({ alt = "Iran flag", ...props }: IranFlagProps) {
  return <Flag code="ir" alt={alt} {...props} />
}
