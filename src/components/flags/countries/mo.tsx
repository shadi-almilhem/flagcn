// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MacauFlagProps = Omit<FlagProps, "code">

export function MacauFlag({ alt = "Macau flag", ...props }: MacauFlagProps) {
  return <Flag code="mo" alt={alt} {...props} />
}
