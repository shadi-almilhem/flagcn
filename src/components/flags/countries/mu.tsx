// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MauritiusFlagProps = Omit<FlagProps, "code">

export function MauritiusFlag({ alt = "Mauritius flag", ...props }: MauritiusFlagProps) {
  return <Flag code="mu" alt={alt} {...props} />
}
