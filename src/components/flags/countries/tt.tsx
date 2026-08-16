// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type TrinidadAndTobagoFlagProps = Omit<FlagProps, "code">

export function TrinidadAndTobagoFlag({ alt = "Trinidad and Tobago flag", ...props }: TrinidadAndTobagoFlagProps) {
  return <Flag code="tt" alt={alt} {...props} />
}
