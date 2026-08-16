// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TogoFlagProps = Omit<FlagProps, "code">

export function TogoFlag({ alt = "Togo flag", ...props }: TogoFlagProps) {
  return <Flag code="tg" alt={alt} {...props} />
}
