// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type FrenchSouthernAndAntarcticLandsFlagProps = Omit<FlagProps, "code">

export function FrenchSouthernAndAntarcticLandsFlag({ alt = "French Southern and Antarctic Lands flag", ...props }: FrenchSouthernAndAntarcticLandsFlagProps) {
  return <Flag code="tf" alt={alt} {...props} />
}
