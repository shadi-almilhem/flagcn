// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type ArkansasFlagProps = Omit<FlagProps, "code">

export function ArkansasFlag({ alt = "Arkansas flag", ...props }: ArkansasFlagProps) {
  return <Flag code="us-ar" alt={alt} {...props} />
}
