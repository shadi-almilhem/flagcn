// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MarylandFlagProps = Omit<FlagProps, "code">

export function MarylandFlag({ alt = "Maryland flag", ...props }: MarylandFlagProps) {
  return <Flag code="us-md" alt={alt} {...props} />
}
