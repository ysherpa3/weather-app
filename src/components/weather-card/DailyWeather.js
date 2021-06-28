// Daily weather information for one week

import { List, ListItem, Typography } from "@material-ui/core"
import React from "react"

const DailyWeather = ({
  dailyData,
  theme,
  dayjs,
  weatherData,
  getRainChanceIcon,
}) => {
  return (
    <List>
      {dailyData.map((day, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(0.5, 1),
          }}
        >
          <Typography variant="body2" sx={{ minWidth: 80 }}>
            {dayjs(day.dt * 1000)
              .tz(weatherData.timezone)
              .isToday()
              ? "Today"
              : dayjs(day.dt * 1000)
                  .tz(weatherData.timezone)
                  .format("dddd")}
          </Typography>
          <img
            src={`${process.env.GATSBY_OWN_ICON_URL}/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
            title={day.weather[0].description}
          />
          <Typography variant="body2" sx={{ minWidth: 54 }}>
            {getRainChanceIcon(day.pop, theme)} {Math.round(day.pop * 100)}%
          </Typography>

          <Typography variant="body2">
            {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}

export default DailyWeather
