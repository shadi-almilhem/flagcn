// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ChadFlagProps = Omit<FlagProps, "code">

export function ChadFlag({ alt = "Chad flag", ...props }: ChadFlagProps) {
  return <Flag code="td" alt={alt} {...props} />
}
