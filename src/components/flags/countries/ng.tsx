// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NigeriaFlagProps = Omit<FlagProps, "code">

export function NigeriaFlag({ alt = "Nigeria flag", ...props }: NigeriaFlagProps) {
  return <Flag code="ng" alt={alt} {...props} />
}
