// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BurundiFlagProps = Omit<FlagProps, "code">

export function BurundiFlag({ alt = "Burundi flag", ...props }: BurundiFlagProps) {
  return <Flag code="bi" alt={alt} {...props} />
}
