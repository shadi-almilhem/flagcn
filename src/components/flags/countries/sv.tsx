// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ElSalvadorFlagProps = Omit<FlagProps, "code">

export function ElSalvadorFlag({ alt = "El Salvador flag", ...props }: ElSalvadorFlagProps) {
  return <Flag code="sv" alt={alt} {...props} />
}
