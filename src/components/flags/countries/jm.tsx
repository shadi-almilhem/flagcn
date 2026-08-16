// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type JamaicaFlagProps = Omit<FlagProps, "code">

export function JamaicaFlag({ alt = "Jamaica flag", ...props }: JamaicaFlagProps) {
  return <Flag code="jm" alt={alt} {...props} />
}
