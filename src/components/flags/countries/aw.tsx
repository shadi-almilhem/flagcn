// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ArubaFlagProps = Omit<FlagProps, "code">

export function ArubaFlag({ alt = "Aruba flag", ...props }: ArubaFlagProps) {
  return <Flag code="aw" alt={alt} {...props} />
}
