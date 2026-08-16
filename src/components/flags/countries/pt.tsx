// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type PortugalFlagProps = Omit<FlagProps, "code">

export function PortugalFlag({ alt = "Portugal flag", ...props }: PortugalFlagProps) {
  return <Flag code="pt" alt={alt} {...props} />
}
