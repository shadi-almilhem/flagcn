// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type LaosFlagProps = Omit<FlagProps, "code">

export function LaosFlag({ alt = "Laos flag", ...props }: LaosFlagProps) {
  return <Flag code="la" alt={alt} {...props} />
}
