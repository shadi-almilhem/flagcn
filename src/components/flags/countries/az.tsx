// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AzerbaijanFlagProps = Omit<FlagProps, "code">

export function AzerbaijanFlag({ alt = "Azerbaijan flag", ...props }: AzerbaijanFlagProps) {
  return <Flag code="az" alt={alt} {...props} />
}
