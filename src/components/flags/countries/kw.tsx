// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KuwaitFlagProps = Omit<FlagProps, "code">

export function KuwaitFlag({ alt = "Kuwait flag", ...props }: KuwaitFlagProps) {
  return <Flag code="kw" alt={alt} {...props} />
}
