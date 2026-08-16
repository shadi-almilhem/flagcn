// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type SamoaFlagProps = Omit<FlagProps, "code">

export function SamoaFlag({ alt = "Samoa flag", ...props }: SamoaFlagProps) {
  return <Flag code="ws" alt={alt} {...props} />
}
