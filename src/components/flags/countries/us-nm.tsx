// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NewMexicoFlagProps = Omit<FlagProps, "code">

export function NewMexicoFlag({ alt = "New Mexico flag", ...props }: NewMexicoFlagProps) {
  return <Flag code="us-nm" alt={alt} {...props} />
}
