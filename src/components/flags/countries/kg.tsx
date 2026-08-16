// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type KyrgyzstanFlagProps = Omit<FlagProps, "code">

export function KyrgyzstanFlag({ alt = "Kyrgyzstan flag", ...props }: KyrgyzstanFlagProps) {
  return <Flag code="kg" alt={alt} {...props} />
}
