// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type AlaskaFlagProps = Omit<FlagProps, "code">

export function AlaskaFlag({ alt = "Alaska flag", ...props }: AlaskaFlagProps) {
  return <Flag code="us-ak" alt={alt} {...props} />
}
