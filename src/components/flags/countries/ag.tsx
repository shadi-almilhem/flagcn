// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AntiguaAndBarbudaFlagProps = Omit<FlagProps, "code">

export function AntiguaAndBarbudaFlag({ alt = "Antigua and Barbuda flag", ...props }: AntiguaAndBarbudaFlagProps) {
  return <Flag code="ag" alt={alt} {...props} />
}
