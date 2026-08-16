// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type NorthernIrelandFlagProps = Omit<FlagProps, "code">

export function NorthernIrelandFlag({ alt = "Northern Ireland flag", ...props }: NorthernIrelandFlagProps) {
  return <Flag code="gb-nir" alt={alt} {...props} />
}
