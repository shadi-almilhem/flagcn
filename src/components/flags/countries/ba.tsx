// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BosniaAndHerzegovinaFlagProps = Omit<FlagProps, "code">

export function BosniaAndHerzegovinaFlag({ alt = "Bosnia and Herzegovina flag", ...props }: BosniaAndHerzegovinaFlagProps) {
  return <Flag code="ba" alt={alt} {...props} />
}
