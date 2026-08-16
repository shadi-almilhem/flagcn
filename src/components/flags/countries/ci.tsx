// SPDX-License-Identifier: MIT

import { Flag, type FlagProps } from "../flag"

export type CoteDIvoireIvoryCoastFlagProps = Omit<FlagProps, "code">

export function CoteDIvoireIvoryCoastFlag({ alt = "Côte d'Ivoire (Ivory Coast) flag", ...props }: CoteDIvoireIvoryCoastFlagProps) {
  return <Flag code="ci" alt={alt} {...props} />
}
