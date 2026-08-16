// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BulgariaFlagProps = Omit<FlagProps, "code">

export function BulgariaFlag({ alt = "Bulgaria flag", ...props }: BulgariaFlagProps) {
  return <Flag code="bg" alt={alt} {...props} />
}
