// Dark/Light mode toggle button

import { IconButton } from "@material-ui/core"
import React from "react"
import { RiMoonClearFill, RiSunFill } from "react-icons/ri"

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

const ToggleColorMode = ({ theme }) => {
  const colorMode = React.useContext(ColorModeContext)

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      sx={{ marginRight: theme.spacing(0.5) }}
      title={theme.palette.mode === "dark" ? "Use light mode" : "Use dark mode"}
    >
      {theme.palette.mode === "dark" ? (
        <RiSunFill color={theme.palette.secondary.main} />
      ) : (
        <RiMoonClearFill color={theme.palette.primary.main} />
      )}
    </IconButton>
  )
}

export default ToggleColorMode
