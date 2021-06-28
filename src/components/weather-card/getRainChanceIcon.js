// Returns a water droplet icon depending on the chance of rain

import { lighten } from "@material-ui/system"
import * as React from "react"
import { BsDroplet, BsDropletFill, BsDropletHalf } from "react-icons/bs"

export const getRainChanceIcon = (percent, theme) => {
  if (percent < 0.2) {
    return (
      <BsDroplet
        color={
          theme.palette.mode === "dark"
            ? lighten(theme.palette.primary.light, 0.25)
            : theme.palette.primary.main
        }
      />
    )
  } else if (percent > 0.2 && percent < 0.6) {
    return (
      <BsDropletHalf
        color={
          theme.palette.mode === "dark"
            ? lighten(theme.palette.primary.light, 0.25)
            : theme.palette.primary.main
        }
      />
    )
  } else {
    return (
      <BsDropletFill
        color={
          theme.palette.mode === "dark"
            ? lighten(theme.palette.primary.light, 0.25)
            : theme.palette.primary.main
        }
      />
    )
  }
}
