// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DjiboutiFlagProps = Omit<FlagProps, "code">

export function DjiboutiFlag({ alt = "Djibouti flag", ...props }: DjiboutiFlagProps) {
  return <Flag code="dj" alt={alt} {...props} />
}
