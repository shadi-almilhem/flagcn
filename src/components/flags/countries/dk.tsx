// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type DenmarkFlagProps = Omit<FlagProps, "code">

export function DenmarkFlag({ alt = "Denmark flag", ...props }: DenmarkFlagProps) {
  return <Flag code="dk" alt={alt} {...props} />
}
