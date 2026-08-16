// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AustriaFlagProps = Omit<FlagProps, "code">

export function AustriaFlag({ alt = "Austria flag", ...props }: AustriaFlagProps) {
  return <Flag code="at" alt={alt} {...props} />
}
