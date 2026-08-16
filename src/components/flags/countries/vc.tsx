// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SaintVincentAndTheGrenadinesFlagProps = Omit<FlagProps, "code">

export function SaintVincentAndTheGrenadinesFlag({ alt = "Saint Vincent and the Grenadines flag", ...props }: SaintVincentAndTheGrenadinesFlagProps) {
  return <Flag code="vc" alt={alt} {...props} />
}
