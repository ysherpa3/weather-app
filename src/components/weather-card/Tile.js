// Paper component for additional weather information

import { Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import * as React from "react"

const Tile = ({ icon, value, unit, caption }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Paper
      elevation={5}
      sx={{
        flex: isMobile ? "0 0 45%" : "0 0 30%",
        margin: "5px",
        padding: "4px 0",
      }}
    >
      <div style={{ textAlign: "center" }}>{icon}</div>
      <Typography variant="body1" align="center">
        {value} {unit}
      </Typography>
      <Typography variant="body2" align="center" color="darkgrey">
        {caption}
      </Typography>
    </Paper>
  )
}

export default Tile
