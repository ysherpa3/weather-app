// Header component

import { AppBar, Toolbar, Typography } from "@material-ui/core"
import WbSunnyIcon from "@material-ui/icons/WbSunny"
import PropTypes from "prop-types"
import * as React from "react"

const Header = ({ siteTitle, theme }) => {
  return (
    <header style={{ flexShrink: 0 }}>
      <AppBar
        position="static"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        enableColorOnDark
      >
        <Toolbar variant="dense">
          <WbSunnyIcon fontSize="large" sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" component="div">
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  theme: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
  theme: {},
}

export default Header
