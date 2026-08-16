// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintHelenaAscensionAndTristanDaCunhaFlagProps = Omit<FlagProps, "code">

export function SaintHelenaAscensionAndTristanDaCunhaFlag({ alt = "Saint Helena, Ascension and Tristan da Cunha flag", ...props }: SaintHelenaAscensionAndTristanDaCunhaFlagProps) {
  return <Flag code="sh" alt={alt} {...props} />
}
