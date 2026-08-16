// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FranceFlagProps = Omit<FlagProps, "code">

export function FranceFlag({ alt = "France flag", ...props }: FranceFlagProps) {
  return <Flag code="fr" alt={alt} {...props} />
}
