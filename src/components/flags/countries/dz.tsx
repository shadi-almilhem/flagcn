// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AlgeriaFlagProps = Omit<FlagProps, "code">

export function AlgeriaFlag({ alt = "Algeria flag", ...props }: AlgeriaFlagProps) {
  return <Flag code="dz" alt={alt} {...props} />
}
