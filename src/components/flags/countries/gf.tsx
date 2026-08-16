// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FrenchGuianaFlagProps = Omit<FlagProps, "code">

export function FrenchGuianaFlag({ alt = "French Guiana flag", ...props }: FrenchGuianaFlagProps) {
  return <Flag code="gf" alt={alt} {...props} />
}
