// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type MississippiFlagProps = Omit<FlagProps, "code">

export function MississippiFlag({ alt = "Mississippi flag", ...props }: MississippiFlagProps) {
  return <Flag code="us-ms" alt={alt} {...props} />
}
