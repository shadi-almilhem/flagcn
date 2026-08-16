// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaoTomeAndPrincipeFlagProps = Omit<FlagProps, "code">

export function SaoTomeAndPrincipeFlag({ alt = "São Tomé and Príncipe flag", ...props }: SaoTomeAndPrincipeFlagProps) {
  return <Flag code="st" alt={alt} {...props} />
}
