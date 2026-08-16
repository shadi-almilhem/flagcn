// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SeychellesFlagProps = Omit<FlagProps, "code">

export function SeychellesFlag({ alt = "Seychelles flag", ...props }: SeychellesFlagProps) {
  return <Flag code="sc" alt={alt} {...props} />
}
