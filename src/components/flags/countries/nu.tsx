// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NiueFlagProps = Omit<FlagProps, "code">

export function NiueFlag({ alt = "Niue flag", ...props }: NiueFlagProps) {
  return <Flag code="nu" alt={alt} {...props} />
}
