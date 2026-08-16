// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AustraliaFlagProps = Omit<FlagProps, "code">

export function AustraliaFlag({ alt = "Australia flag", ...props }: AustraliaFlagProps) {
  return <Flag code="au" alt={alt} {...props} />
}
