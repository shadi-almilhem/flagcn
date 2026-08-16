// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AmericanSamoaFlagProps = Omit<FlagProps, "code">

export function AmericanSamoaFlag({ alt = "American Samoa flag", ...props }: AmericanSamoaFlagProps) {
  return <Flag code="as" alt={alt} {...props} />
}
