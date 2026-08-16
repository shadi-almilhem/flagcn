// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type VaticanCityHolySeeFlagProps = Omit<FlagProps, "code">

export function VaticanCityHolySeeFlag({ alt = "Vatican City (Holy See) flag", ...props }: VaticanCityHolySeeFlagProps) {
  return <Flag code="va" alt={alt} {...props} />
}
