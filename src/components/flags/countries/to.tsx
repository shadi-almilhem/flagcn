// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TongaFlagProps = Omit<FlagProps, "code">

export function TongaFlag({ alt = "Tonga flag", ...props }: TongaFlagProps) {
  return <Flag code="to" alt={alt} {...props} />
}
