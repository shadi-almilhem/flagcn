// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ReunionFlagProps = Omit<FlagProps, "code">

export function ReunionFlag({ alt = "Réunion flag", ...props }: ReunionFlagProps) {
  return <Flag code="re" alt={alt} {...props} />
}
