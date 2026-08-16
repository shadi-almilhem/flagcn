// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type RepublicOfTheCongoFlagProps = Omit<FlagProps, "code">

export function RepublicOfTheCongoFlag({ alt = "Republic of the Congo flag", ...props }: RepublicOfTheCongoFlagProps) {
  return <Flag code="cg" alt={alt} {...props} />
}
