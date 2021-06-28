// Switch for toggling units between imperial and metric

import { Stack, Switch, Typography, useMediaQuery } from "@material-ui/core"
import * as React from "react"

const ToggleUnits = ({ checked, onChange, theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Stack
      direction="row"
      spacing={0.25}
      justifyContent={isMobile ? "center" : "flex-end"}
      alignItems="center"
      paddingRight={theme.spacing(1)}
    >
      <Typography
        variant="subtitle2"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
      >
        Imperial: °F, mph
      </Typography>
      <Switch
        checked={checked}
        onChange={onChange}
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        title="Toggle metric/imperial units"
      />
      <Typography
        variant="subtitle2"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
      >
        Metric: °C, m/s
      </Typography>
    </Stack>
  )
}

export default ToggleUnits
