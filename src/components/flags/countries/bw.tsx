// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type BotswanaFlagProps = Omit<FlagProps, "code">

export function BotswanaFlag({ alt = "Botswana flag", ...props }: BotswanaFlagProps) {
  return <Flag code="bw" alt={alt} {...props} />
}
