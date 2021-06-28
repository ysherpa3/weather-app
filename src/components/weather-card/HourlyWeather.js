// Hourly weather information for 24 hours

import { List, ListItem, Typography } from "@material-ui/core"
import * as React from "react"

const HourlyWeather = ({
  hourlyData,
  theme,
  dayjs,
  weatherData,
  getRainChanceIcon,
}) => {
  return (
    <List
      sx={{
        display: "flex",
        overflowX: "scroll",
        marginBottom: "12px",
      }}
    >
      {hourlyData.slice(1, 25).map((hour, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(0.5, 1),
          }}
        >
          <Typography variant="body2" align="center">
            {dayjs(hour.dt * 1000)
              .tz(weatherData.timezone)
              .format("h A")}
          </Typography>
          <img
            src={`${process.env.GATSBY_OWN_ICON_URL}/${hour.weather[0].icon}.png`}
            alt={hour.weather[0].description}
            title={hour.weather[0].description}
          />
          <Typography variant="body2" align="center">
            {Math.round(hour.temp)}°
          </Typography>
          <Typography variant="body2" align="center">
            {getRainChanceIcon(hour.pop, theme)} {Math.round(hour.pop * 100)}%
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}

export default HourlyWeather
